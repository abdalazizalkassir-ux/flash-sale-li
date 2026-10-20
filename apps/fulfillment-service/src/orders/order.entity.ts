import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: string; // MySQL BIGINT comes back as a string

  @Column({ name: 'customer_id', type: 'bigint', unsigned: true })
  customerId!: number;

  @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
  totalPrice!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}