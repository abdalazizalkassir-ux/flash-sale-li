import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Cart } from './carts.entity';
import { CartItem } from './cart-item.entity';
import { Product } from '../products/products.entity';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem, Product]), AuthModule],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}