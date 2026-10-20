import { Injectable } from '@nestjs/common';

@Injectable()
export class FulfillmentServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
