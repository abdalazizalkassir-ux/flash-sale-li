import { Test, TestingModule } from '@nestjs/testing';
import { FulfillmentServiceController } from './fulfillment-service.controller';
import { FulfillmentServiceService } from './fulfillment-service.service';

describe('FulfillmentServiceController', () => {
  let fulfillmentServiceController: FulfillmentServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FulfillmentServiceController],
      providers: [FulfillmentServiceService],
    }).compile();

    fulfillmentServiceController = app.get<FulfillmentServiceController>(FulfillmentServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(fulfillmentServiceController.getHello()).toBe('Hello World!');
    });
  });
});
