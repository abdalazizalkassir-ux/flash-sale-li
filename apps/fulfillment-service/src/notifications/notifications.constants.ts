export const NOTIFICATIONS_QUEUE = 'notifications-queue';

export enum NotificationJob {
  OrderReceipt = 'order-receipt',
  AbandonedCart = 'abandoned-cart',
}

export interface ReceiptItem {
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderReceiptJobData {
  orderId: number;
  customerEmail: string;
  items: ReceiptItem[];
  totalPrice: number;
}

export interface AbandonedCartJobData {
  cartId: number;
  customerEmail: string;
}