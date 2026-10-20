import { Injectable,ConflictException,UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Customer } from '../customers/customer.entity';
import randomBytes from 'crypto';
import * as bcrypt from 'bcrypt';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../carts/carts.entity';
import { LoginDto } from './dto/login.dto'; 



@Injectable()
export class AuthService {
constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly dataSource: DataSource,
    private readonly jwtServices : JwtService, 

) {}

async register(registerDto: RegisterDto){
return this.dataSource.transaction(async (manager) => {

const existingCustomer = await manager.findOne(Customer,{where:{
    email:registerDto.email
}});
if(existingCustomer)
    throw new ConflictException('Email already exists');    

const passwordHash = await bcrypt.hash(registerDto.password,10);

const newCustomer = manager.create(Customer,{
    email:registerDto.email,
    fullName:registerDto.fullName,
    passwordHash:passwordHash
})   

const savedCustomer = await manager.save(newCustomer);

const newCart = manager.create(Cart, {
    customerId: { id: savedCustomer.id }
});

const savedCart = await manager.save(newCart);

return {
    customer: {
        id: savedCustomer.id,
        email: savedCustomer.email,
        fullName: savedCustomer.fullName
    },
    cart: {
        id: savedCart.id,
        customerID: savedCart.customerId
    }
}

})
}


async login(loginDto: LoginDto){
const customer = await this.customerRepository.findOne({where:{email:loginDto.email}})

if(!customer)
    throw new UnauthorizedException('Invalid Email');

const isMatch = await bcrypt.compare(loginDto.password, customer.passwordHash);

if(!isMatch)
    throw new UnauthorizedException('Invalid credentials');

const accessToken = await this.jwtServices.signAsync({
    sub:customer.id,
    email:customer.email,
      role: customer.role,

});



return {
    accessToken,
    customer:{
        id:customer.id,
        email:customer.email,
        fullName:customer.fullName
    }
}


}




}