import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Cart } from './carts.entity';
import { Product } from '../products/products.entity';
@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart!: Relation<Cart>;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product!: Relation<Product>;

  @Column({ type: 'int' })
  quantity!: number;
}
