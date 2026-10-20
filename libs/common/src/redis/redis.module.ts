import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';
import { RedisService } from './redis.service';

@Global()
@Module({})
export class RedisModule {
  /**
   * Each Nest application calls this once. The implementation is shared,
   * but every running application owns and closes its own TCP connection.
   */
  static forRoot(): DynamicModule {
    return {
      module: RedisModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: REDIS_CLIENT,
          inject: [ConfigService],
          useFactory: (config: ConfigService) =>
            new Redis({
              host: config.get<string>('REDIS_HOST', 'localhost'),
              port: config.get<number>('REDIS_PORT', 6379),
              password: config.get<string>('REDIS_PASSWORD') || undefined,
            }),
        },
        RedisService,
      ],
      exports: [RedisService, REDIS_CLIENT],
    };
  }
}
