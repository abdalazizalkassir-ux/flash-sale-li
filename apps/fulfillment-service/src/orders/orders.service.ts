import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import type { OrderCreatedEvent } from '@app/common';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async create(event: OrderCreatedEvent): Promise<{ id: number }> {
    const maxAttempts = 3;

    for (let attempt = 1; ; attempt++) {
      try {
        return await this.save(event);
      } catch (err: any) {
        const code = err?.code ?? err?.driverError?.code;
        if (code !== 'ER_LOCK_DEADLOCK' || attempt >= maxAttempts) throw err;

        this.logger.warn(`Deadlock, retrying (${attempt}/${maxAttempts})`);
        await new Promise((resolve) => setTimeout(resolve, 50 * attempt));
      }
    }
  }

  private async save(event: OrderCreatedEvent): Promise<{ id: number }> {
    return this.dataSource.transaction(async (manager) => {
      // 1. Lock and update the product rows first, always in id order,
      //    so concurrent orders wait in line instead of deadlocking.
      const sorted = [...event.items].sort((a, b) => a.productId - b.productId);
      for (const i of sorted) {
        await manager.query(
          'UPDATE products SET stock = GREATEST(CAST(stock AS SIGNED) - ?, 0) WHERE id = ?',
          [i.quantity, i.productId],
        );
      }

      // 2. Then save the order and its items.
      const order = await manager.save(
        manager.create(Order, {
          customerId: event.customerId,
          totalPrice: event.totalPrice,
        }),
      );

      await manager.insert(
        OrderItem,
        event.items.map((i) => ({
          orderId: order.id,
          productId: i.productId,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
        })),
      );

      this.logger.log(`Saved order ${order.id} with ${event.items.length} item(s)`);
      return { id: Number(order.id) };
    });
  }
}