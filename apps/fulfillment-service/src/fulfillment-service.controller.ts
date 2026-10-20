import { Controller, Get } from '@nestjs/common';
import { FulfillmentServiceService } from './fulfillment-service.service';

@Controller()
export class FulfillmentServiceController {
  constructor(private readonly fulfillmentServiceService: FulfillmentServiceService) {}

  @Get()
  getHello(): string {
    return this.fulfillmentServiceService.getHello();
  }
}
