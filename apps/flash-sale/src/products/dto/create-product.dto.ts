import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  MaxLength,
  MinLength,
  Min,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 15', minLength: 3, maxLength: 50 })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name!: string;

  @ApiProperty({ example: 999.99, description: 'Unit price, must be greater than 0' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price!: number;

  @ApiProperty({ example: 100, minimum: 0, description: 'Initial stock quantity' })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stock!: number;
}
