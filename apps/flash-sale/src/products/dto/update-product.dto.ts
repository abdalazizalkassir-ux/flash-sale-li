import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'iPhone 15 Pro', minLength: 3, maxLength: 50 })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name?: string;

  @ApiPropertyOptional({ example: 1099.99, description: 'Unit price, must be greater than 0' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price?: number;
}