import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { Role } from "./role.enum";



@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column({ name: 'full_name' })
    fullName!: string;

    @Column({ name: 'password_hash' })
    passwordHash!: string;

    @Column({ type: 'enum', enum: Role, default: Role.CUSTOMER })
    role!: Role;

}