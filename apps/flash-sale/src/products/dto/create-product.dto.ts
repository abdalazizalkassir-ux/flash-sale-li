import {IsString, IsNotEmpty, IsNumber, IsPositive, MaxLength, MinLength, Min, IsInt} from "class-validator";
import { Type } from "class-transformer";


export class CreateProductDto { 

@IsString()
@IsNotEmpty()
@MinLength(3)
@MaxLength(50)
name!: string;

@Type(() => Number)
@IsNumber()
@IsNotEmpty()
@IsPositive()
price!: number;


@IsNotEmpty()
@IsInt()
@Min(0)
stock!: number;
}

