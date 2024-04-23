import { timestamp } from './../helpers/dateTime.helpers';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Order } from 'src/common/entities/order.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RefreshToken } from './refreshToken.entity';

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
  @Column()
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

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];
}
