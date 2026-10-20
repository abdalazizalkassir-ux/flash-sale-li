// apps/fulfillment-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { FulfillmentServiceModule } from './fulfillment-service.module'; // use your actual module file/class name
import 'dotenv/config';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FulfillmentServiceModule,
    {
      transport: Transport.REDIS,
      options: { host: 'localhost', port: 6379 },
    },
  );
  await app.listen();
}
bootstrap();