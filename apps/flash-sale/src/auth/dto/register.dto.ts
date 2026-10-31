import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'John Smith',
    minLength: 3,
    description: 'Letters and spaces only (apostrophes and hyphens are allowed between letters)',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @Matches(/^\p{L}+(?:[ '\-]\p{L}+)*$/u, {
    message: 'Full name must contain letters and spaces only',
  })
  fullName!: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'Password123',
    minLength: 8,
    description: 'At least 8 characters, with one uppercase letter and one number',
  })
  @IsString()
  @MinLength(8)
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[0-9]/, {
    message: 'Password must contain at least one number',
  })
  password!: string;
}