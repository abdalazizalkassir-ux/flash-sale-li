import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Cart } from './carts.entity';
import { CartItem } from './cart-item.entity';
import { CartStatus } from './cart-status.enum';
import { Product } from '../products/products.entity';
import { AddCartItemDto } from './dto/add-cart-item.dto';

@Injectable()
export class CartsService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async addItem(customerId: number, dto: AddCartItemDto) {
    return this.dataSource.transaction(async (manager) => {
      const cart = await manager.findOne(Cart, {
        where: { customerId: { id: customerId } },
      });
      if (!cart) throw new NotFoundException('Cart not found');

      const product = await manager.findOne(Product, {
        where: { id: dto.productId },
      });
      if (!product) throw new NotFoundException('Product not found');

      let item = await manager.findOne(CartItem, {
        where: { cart: { id: cart.id }, product: { id: product.id } },
      });

      if (item) {
        item.quantity += dto.quantity; // already in the cart: add to it
      } else {
        item = manager.create(CartItem, { cart, product, quantity: dto.quantity });
      }
      await manager.save(item);

      // Mark the cart active and refresh last_updated_at.
      // update() always writes the timestamp, even if the status didn't change.
      await manager.update(Cart, cart.id, { status: CartStatus.ACTIVE });

      return { message: 'Item added', productId: product.id, quantity: item.quantity };
    });
  }

  async getCart(customerId: number) {
    const cart = await this.dataSource.manager.findOne(Cart, {
      where: { customerId: { id: customerId } },
      relations: { items: { product: true } },
    });
    if (!cart) throw new NotFoundException('Cart not found');

    return {
      cartId: cart.id,
      status: cart.status,
      items: cart.items.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
      })),
    };
  }
}