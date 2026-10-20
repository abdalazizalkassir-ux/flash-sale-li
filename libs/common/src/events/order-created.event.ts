export interface OrderItemEvent {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderCreatedEvent {
  customerId: number;
  customerEmail: string;
  items: OrderItemEvent[];
  totalPrice: number;
  createdAt: string;
}

export const ORDER_CREATED_CHANNEL = 'order.created';