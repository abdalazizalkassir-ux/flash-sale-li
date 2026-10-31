import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bullmq';
import { InjectDataSource } from '@nestjs/typeorm';
import { Queue } from 'bullmq';
import { DataSource } from 'typeorm';
import {
  NOTIFICATIONS_QUEUE,
  NotificationJob,
} from './notifications.constants';
import type { AbandonedCartJobData } from './notifications.constants';

@Injectable()
export class AbandonedCartCron {
  private readonly logger = new Logger(AbandonedCartCron.name);

  constructor(
    @InjectQueue(NOTIFICATIONS_QUEUE) private readonly queue: Queue,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async enqueueAbandonedCarts() {
    const minutes = Number(process.env.ABANDONED_AFTER_MINUTES ?? 1440); // 1440 = 24 hours

    const carts: { id: string; email: string }[] = await this.dataSource.query(
      `SELECT c.id, cu.email
         FROM carts c
         JOIN customers cu ON cu.id = c.customer_id
        WHERE c.status = 'ACTIVE'
          AND c.last_updated_at < NOW() - INTERVAL ? MINUTE
          AND EXISTS (SELECT 1 FROM cart_items ci WHERE ci.cart_id = c.id)`,
      [minutes],
    );

    if (carts.length === 0) return;
    this.logger.log(`Found ${carts.length} abandoned cart(s)`);

    for (const cart of carts) {
      const cartId = Number(cart.id);

      await this.queue.add(
        NotificationJob.AbandonedCart,
        { cartId, customerEmail: cart.email } satisfies AbandonedCartJobData,
        { jobId: `abandoned-${cartId}-${new Date().toISOString().slice(0, 10)}` },
      );

      // Mark it so the customer is not emailed again every minute.
      await this.dataSource.query(
        `UPDATE carts SET status = 'ABANDONED' WHERE id = ?`,
        [cartId],
      );
    }
  }
}