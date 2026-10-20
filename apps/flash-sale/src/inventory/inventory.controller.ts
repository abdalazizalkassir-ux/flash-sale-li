import { Body, UseGuards,Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { IsInt, IsPositive } from 'class-validator';
import { InventoryService } from './inventory.service';
import { Role } from '../customers/role.enum';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

class SetStockDto {
  @IsInt()
  @IsPositive()
  stock!: number;
}

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post(':productId/stock')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  setStock(@Param('productId', ParseIntPipe) productId: number, @Body() dto: SetStockDto) {
    return this.inventoryService.setStock(productId, dto.stock);
  }

  @Get(':productId/stock')
  getStock(@Param('productId', ParseIntPipe) productId: number) {
    return this.inventoryService.getStock(productId);
  }
}
