import { BadRequestException, Injectable, Logger,ServiceUnavailableException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ORDER_CREATED_CHANNEL, RedisService } from '@app/common';
import type { OrderCreatedEvent } from '@app/common';
import { Cart } from '../carts/carts.entity';
import { CartItem } from '../carts/cart-item.entity';
import { Customer } from '../customers/customer.entity';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly redis: RedisService,
    private readonly products: ProductsService,
  ) {}

  async createOrderFromCart(customerId: number) {
    const cart = await this.dataSource.manager.findOne(Cart, {
      where: { customerId: { id: customerId } },
      relations: { items: { product: true } },
    });
    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const customer = await this.dataSource.manager.findOneByOrFail(Customer, {
      id: customerId,
    });

    const reserved: { productId: number; quantity: number }[] = [];
    const release = async () => {
      for (const r of reserved) {
        await this.redis.incrementStock(r.productId, r.quantity);
      }
    };

    let event: OrderCreatedEvent;

    try {
for (const item of cart.items) {
  const productId = Number(item.product.id);

  await this.products.ensureStockCached(productId);

  const remaining = await this.redis.reserveStock(productId, item.quantity);
  if (remaining === null) {
    throw new BadRequestException(`Out of stock: ${item.product.name}`);
  }
  reserved.push({ productId, quantity: item.quantity });
}
      const items = cart.items.map((i) => ({
        productId: Number(i.product.id),
        productName: i.product.name,
        quantity: i.quantity,
        unitPrice: i.product.price,
      }));

      const totalPrice =
        Math.round(items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0) * 100) / 100;

      event = {
        customerId: Number(customer.id),
        customerEmail: customer.email,
        items,
        totalPrice,
        createdAt: new Date().toISOString(),
      };

const receivers = await this.redis.publish(ORDER_CREATED_CHANNEL, event);
if (receivers === 0) {
  throw new ServiceUnavailableException(
    'Order processing is unavailable. Please try again shortly.',
  );
}
    } catch (err) {
      await release();
      throw err;
    }

    try {
      await this.dataSource
        .createQueryBuilder()
        .delete()
        .from(CartItem)
        .where('cart_id = :cartId', { cartId: cart.id })
        .execute();
    } catch (err) {
      this.logger.error(`Order published but cart ${cart.id} was not cleared`, err as Error);
    }

    return {
      message: 'Order placed',
      itemCount: event.items.length,
      totalPrice: event.totalPrice,
    };
  }
}