import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { NotificationActionEnum } from '../enums/NotificationAction.enum';

@Entity({ name: 'order_notifications' })
export class OrderNotification {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ default: NotificationActionEnum.ORDER_CREATED })
  type: NotificationActionEnum;

  @ManyToOne(() => Order, (order) => order.notifications)
  order: Order;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  readAt: Date;
}
