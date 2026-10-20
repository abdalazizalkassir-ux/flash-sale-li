import { Delete,Body, Controller,Post , Get,Param ,Patch,ParseIntPipe, UseGuards} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AddStockDto } from './dto/add-stock.dto';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../customers/role.enum';


@Controller('products')
export class ProductsController {
constructor(private readonly productsService: ProductsService) {}


@Post()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
}

@Get()
async getAllProducts() {
    return this.productsService.getAllProducts();
}

@Get(':id')
async getProductById(@Param('id') id: number) {
    return this.productsService.getProductById(id);
}


@Patch(':id')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
async updateProduct(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateProductDto: UpdateProductDto,
) {
  return this.productsService.updateProduct(id, updateProductDto);
}



@Delete(':id')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
async deleteProduct(
  @Param('id', ParseIntPipe) id: number,
) {
  return this.productsService.deleteProduct(id);
}



@Patch(':id/stock')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
addStock(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: AddStockDto,
) {
  return this.productsService.addStock(id, dto.quantity);
}

}
