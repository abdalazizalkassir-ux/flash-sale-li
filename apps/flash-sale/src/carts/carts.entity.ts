import {PrimaryGeneratedColumn, Column ,Entity,OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { CartStatus } from './cart-status.enum';
import { Customer } from '../customers/customer.entity';
import { CartItem } from './cart-item.entity';
import type { Relation } from 'typeorm';
@Entity('carts')
export class Cart {
    @PrimaryGeneratedColumn()
    id!: number;    

    @OneToOne(() => Customer, { nullable: false })
    @JoinColumn({ name: 'customer_id' })
    customerId!: Customer;


    @Column({ type: 'enum', enum: CartStatus, default: CartStatus.ACTIVE })
    status!: CartStatus;


    @UpdateDateColumn({ name: 'last_updated_at' })
    lastUpdatedAt!: Date;

    @OneToMany(() => CartItem, (item) => item.cart)
    items!: Relation<CartItem[]>;
}
 

