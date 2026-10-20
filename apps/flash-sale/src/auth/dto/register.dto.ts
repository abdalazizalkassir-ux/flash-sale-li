import { IsEmail, IsNotEmpty, IsString, MinLength , Matches} from 'class-validator';




export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @Matches(/^\p{L}+(?:[ '\-]\p{L}+)*$/u, {
  message: 'Full name must contain letters and spaces only',
})
  fullName!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;


    @IsString()
    @MinLength(8)
    @Matches(/[A-Z]/,{
        message : `Password must contain at least one uppercase letter`
    })
    @Matches(/[0-9]/,{
        message : `Password must contain at least one number`
    })
    password!: string;
}