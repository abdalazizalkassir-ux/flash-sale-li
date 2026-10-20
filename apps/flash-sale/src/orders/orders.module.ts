import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { InventoryModule } from '../inventory/inventory.module';
import { AuthModule } from '../auth/auth.module';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [OrdersController],
  imports: [AuthModule, InventoryModule, ProductsModule],
  providers: [OrdersService],
})
export class OrdersModule {}