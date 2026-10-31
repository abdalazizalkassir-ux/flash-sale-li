import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AddStockDto {
  @ApiProperty({ example: 50, minimum: 1 })
  @IsInt()
  @IsPositive()
  quantity!: number;
}