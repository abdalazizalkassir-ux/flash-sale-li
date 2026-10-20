import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { CartsService } from './carts.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';

@Controller('carts')
@UseGuards(JwtAuthGuard)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('items')
  addItem(@CurrentUser() user: { userId: number }, @Body() dto: AddCartItemDto) {
    return this.cartsService.addItem(user.userId, dto);
  }

  @Get()
  getCart(@CurrentUser() user: { userId: number }) {
    return this.cartsService.getCart(user.userId);
  }
}