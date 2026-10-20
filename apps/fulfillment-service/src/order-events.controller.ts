import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { ORDER_CREATED_CHANNEL } from '@app/common';
import type { OrderCreatedEvent } from '@app/common';
import {
  NOTIFICATIONS_QUEUE,
  NotificationJob,
} from './notifications/notifications.constants';
import type { OrderReceiptJobData } from './notifications/notifications.constants';
import { OrdersService } from './orders/orders.service';

@Controller()
export class OrderEventsController {
  constructor(
    @InjectQueue(NOTIFICATIONS_QUEUE) private queue: Queue,
    private orders: OrdersService,
  ) {}

  @EventPattern(ORDER_CREATED_CHANNEL)
  async onOrderCreated(@Payload() event: OrderCreatedEvent) {
    const order = await this.orders.create(event);

    await this.queue.add(
      NotificationJob.OrderReceipt,
      {
        orderId: order.id,
        customerEmail: event.customerEmail,
        items: event.items.map((i) => ({
          productName: i.productName,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
        })),
        totalPrice: event.totalPrice,
      } satisfies OrderReceiptJobData,
      { jobId: `receipt-${order.id}` },
    );
  }
}