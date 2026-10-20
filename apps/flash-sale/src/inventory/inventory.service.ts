import { Injectable, NotFoundException } from '@nestjs/common';
import { RedisService } from '@app/common';

@Injectable()
export class InventoryService {
  constructor(private readonly redis: RedisService) {}

  async setStock(productId: number, stock: number): Promise<{ productId: number; stock: number }> {
    await this.redis.setStock(productId, stock);
    return { productId, stock };
  }

  async getStock(productId: number): Promise<{ productId: number; stock: number }> {
    const stock = await this.redis.getStock(productId);
    if (stock === null) {
      throw new NotFoundException(`No Redis stock has been seeded for product ${productId}`);
    }
    return { productId, stock };
  }
}
