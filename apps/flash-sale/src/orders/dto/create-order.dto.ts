import { Type } from 'class-transformer';
import { IsEmail, IsInt, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class CreateOrderDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  customerId!: number;

  @IsEmail()
  customerEmail!: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  productId!: number;

  @IsString()
  productName!: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  quantity!: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  totalPrice!: number;
}
