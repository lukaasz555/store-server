import { Order } from 'src/common/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  hashedPassword: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Order, (order) => order.user)
  orders: Order[];
}
