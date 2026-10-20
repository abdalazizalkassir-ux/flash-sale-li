import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';

@Injectable()
export class RedisService implements OnModuleDestroy {
  constructor(@Inject(REDIS_CLIENT) private readonly client: Redis) {}

  /** Use a stable key format so both applications refer to the same stock. */
  inventoryKey(productId: number): string {
    return `item:${productId}:stock`;
  }


  async setStock(productId: number, stock: number): Promise<void> {
    await this.client.set(this.inventoryKey(productId), stock);
  }

  async setStockIfAbsent(productId: number, stock: number): Promise<boolean> {
  const result = await this.client.set(this.inventoryKey(productId), stock, 'NX');
  return result === 'OK';
}



  async getStock(productId: number): Promise<number | null> {
    const value = await this.client.get(this.inventoryKey(productId));
    return value === null ? null : Number(value);
  }

  /**
   * Redis executes DECRBY atomically. Concurrent API requests cannot reserve
   * the same inventory unit twice.
   */
  async decrementStock(productId: number, quantity: number): Promise<number> {
    return this.client.decrby(this.inventoryKey(productId), quantity);
  }

  async incrementStock(productId: number, quantity: number): Promise<number> {
    return this.client.incrby(this.inventoryKey(productId), quantity);
  }
async publish(channel: string, payload: unknown): Promise<number> {
  return this.client.publish(
    channel,
    JSON.stringify({ pattern: channel, data: payload }),
  );
}

  /** A subscriber needs its own connection because SUBSCRIBE changes it to subscriber mode. */
  createSubscriber(): Redis {
    return this.client.duplicate();
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.quit();
  }
}
