import { IsInt, IsPositive } from 'class-validator';

export class AddStockDto {
  @IsInt()
  @IsPositive()
  quantity!: number;
}