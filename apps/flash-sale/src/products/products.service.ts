import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { RedisService } from '@app/common';


@Injectable()
export class ProductsService {
constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly redis: RedisService
) {}

async createProduct(CreateProductDto: CreateProductDto) {
const newProduct = this.productRepository.create(CreateProductDto);
return this.productRepository.save(newProduct);
}

async getAllProducts() {
    return this.productRepository.find();   
    }

async getProductById(id: number) {
    const product = await this.productRepository.findOne({where:{id}});
    if (!product) {
       throw new NotFoundException(
      `Product with ID ${id} was not found`,
    );
    }
    return product;
}



async updateProduct(id: number, updateProductDto: UpdateProductDto) {
  const product = await this.productRepository.preload({
    id,
    ...updateProductDto,
  });

  if (!product) {
    throw new NotFoundException(
      `Product with ID ${id} was not found`,
    );
  }

  return this.productRepository.save(product);
}



async deleteProduct(id: number) {
  const result = await this.productRepository.delete(id);

  if (result.affected === 0) {
    throw new NotFoundException(
      `Product with ID ${id} was not found`,
    );
  }

  return {
    message: `Product with ID ${id} was deleted successfully`,
  };
}



async addStock(id: number, quantity: number) {
  const result = await this.productRepository.increment({ id }, 'stock', quantity);

  if (!result.affected) {
    throw new NotFoundException('Product not found');
  }

  const product = await this.productRepository.findOneByOrFail({ id });

  // Keep Redis in sync with MySQL.
  const current = await this.redis.getStock(id);
  if (current === null) {
    // Redis has no number yet: start it from the MySQL total.
    await this.redis.setStock(id, product.stock);
  } else {
    // Redis already has a live number (orders may be decrementing it): just add.
    await this.redis.incrementStock(id, quantity);
  }

  return product;
}


async ensureStockCached(productId: number): Promise<void> {
  const cached = await this.redis.getStock(productId);
  if (cached !== null) return; // cache hit: no database call

  // cache miss: load from MySQL once
  const product = await this.productRepository.findOne({
    where: { id: productId },
    select: { id: true, stock: true },
  });
  if (!product) throw new NotFoundException('Product not found');

  await this.redis.setStockIfAbsent(productId, product.stock);
}


}
