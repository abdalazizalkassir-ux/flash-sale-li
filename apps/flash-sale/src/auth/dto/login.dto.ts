import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'Password123', minLength: 8 })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password!: string;
}