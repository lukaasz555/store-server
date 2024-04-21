import { timestamp } from './../helpers/dateTime.helpers';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Order } from 'src/common/entities/order.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @IsOptional()
  @Column({ nullable: true })
  name: string;

  @IsOptional()
  @Column({ nullable: true })
  lastname: string;

  @IsNotEmpty()
  @Column({ unique: true })
  email: string;

  @IsNotEmpty()
  @Column({ select: false })
  hashedPassword: string;

  @IsString()
  @Column()
  createdAt: string;

  @Column({ type: 'json', nullable: false, default: [] })
  favoriteProductsIds: number[] = [];

  @OneToOne(() => Order, (order) => order.user)
  orders: Order[];

  @BeforeInsert()
  addTimestamp(): void {
    this.createdAt = timestamp;
  }
}
