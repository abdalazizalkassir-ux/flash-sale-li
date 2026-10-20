import { Logger } from '@nestjs/common';
import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job, UnrecoverableError } from 'bullmq';
import { Resend } from 'resend';
import {
  NOTIFICATIONS_QUEUE,
  NotificationJob,
} from './notifications.constants';
import type { OrderReceiptJobData ,AbandonedCartJobData} from './notifications.constants';

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

@Processor(NOTIFICATIONS_QUEUE, {
  concurrency: 5,
  settings: {
    // attemptsMade is 1, 2, 3 -> waits 5s, 15s, 45s
    backoffStrategy: (attemptsMade: number) => 5000 * 3 ** (attemptsMade - 1),
  },
})


export class NotificationsProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificationsProcessor.name);
  private readonly resend = new Resend(process.env.RESEND_API_KEY);

  async process(job: Job) {
      this.logger.log(`Processing ${job.id}, attempts configured: ${job.opts.attempts}`);

    switch (job.name) {
      case NotificationJob.OrderReceipt:
        return this.sendReceipt(job.data as OrderReceiptJobData);
        case NotificationJob.AbandonedCart:
            return this.sendAbandonedCart(job.data as AbandonedCartJobData);
        default:
        throw new UnrecoverableError(`Unknown job name: ${job.name}`);
    }
  }

private async sendReceipt(d: OrderReceiptJobData) {
  const rows = d.items
    .map(
      (i) =>
        `<li>${escapeHtml(i.productName)} &times; ${i.quantity} &ndash; $${(i.unitPrice * i.quantity).toFixed(2)}</li>`,
    )
    .join('');

  const { data, error } = await this.resend.emails.send({
    from: 'Flash Sale <onboarding@resend.dev>',
    to: d.customerEmail,
    subject: `Order Confirmation #${d.orderId} - Flash Sale Store`,
    html: `<p>Hello Customer,</p>
      <p>Thank you for your purchase! Here is your order receipt:</p>
      <ul>${rows}</ul>
      <p><strong>Total Paid: $${d.totalPrice.toFixed(2)}</strong></p>
      <p>We are preparing your order for shipment!</p>`,
  });

  if (error) {
    const status = (error as any).statusCode ?? 500;
    if (status >= 500 || status === 429) throw new Error(error.message);
    throw new UnrecoverableError(error.message);
  }

  this.logger.log(`Resend accepted the email, id: ${data?.id}`);
}

private async sendAbandonedCart(d: AbandonedCartJobData) {
  const { data, error } = await this.resend.emails.send({
    from: 'Flash Sale <onboarding@resend.dev>',
    to: d.customerEmail,
    subject: 'You left something behind!',
    html: `<p>You left something behind!</p>
      <p>Complete your order now and get 10% off.</p>`,
  });

  if (error) {
    const status = (error as any).statusCode ?? 500;
    if (status >= 500 || status === 429) throw new Error(error.message);
    throw new UnrecoverableError(error.message);
  }

  this.logger.log(`Abandoned-cart email sent, id: ${data?.id}`);
}


  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    this.logger.log(`Job ${job.id} completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, err: Error) {
    this.logger.warn(
      `Job ${job.id} failed (attempt ${job.attemptsMade}/${job.opts.attempts}): ${err.message}`,
    );
  }
}