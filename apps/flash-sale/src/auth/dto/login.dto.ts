import { IsEmail, IsNotEmpty, IsString, MinLength , Matches} from 'class-validator';



export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password!: string;
}