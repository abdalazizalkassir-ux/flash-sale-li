import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { OrderEventsController } from './order-events.controller';
import { OrdersService } from './orders/orders.service';
import { OrderItem } from 'apps/fulfillment-service/src/orders/order-item.entity';
import { NotificationsProcessor } from './notifications/notifications.processor';
import { NOTIFICATIONS_QUEUE } from './notifications/notifications.constants';
import { Order } from 'apps/fulfillment-service/src/orders/order.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { AbandonedCartCron } from './notifications/abandoned-cart.cron';




@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Order, OrderItem]),
    BullModule.forRoot({ connection: { host: 'localhost', port: 6379 } }),
    BullModule.registerQueue({
      name: NOTIFICATIONS_QUEUE,
      defaultJobOptions: {
        attempts: 4,
        backoff: { type: 'custom' },
        removeOnComplete: true,
        removeOnFail: false,
      },
    }),
  ],
  controllers: [OrderEventsController],
  providers: [OrdersService, NotificationsProcessor, AbandonedCartCron],
})
export class FulfillmentServiceModule {}