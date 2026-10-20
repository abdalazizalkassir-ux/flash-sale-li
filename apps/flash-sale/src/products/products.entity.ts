import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";



@Entity('products')
export class Product {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

@Column({
  type: 'decimal',
  precision: 10,
  scale: 2,
  transformer: {
    to: (value: number) => value,
    from: (value: string) => Number(value),
  },
})
price!: number;


@Column({ type: 'int', default: 0 })
stock!: number;
}