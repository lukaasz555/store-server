import { DeliveryTypeEnum } from 'src/common/enums/DeliveryType.enum';
import { OrderStatusEnum } from 'src/common/enums/OrderStatus.enum';
import { PaymentMethodEnum } from 'src/common/enums/PaymentMethod.enum';
import { Product } from 'src/common/entities/product.entity';
import { User } from 'src/common/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @Column({ default: 0 })
  productsCost: number;

  @Column({ default: 0 })
  shippingCost: number;

  @Column({ default: DeliveryTypeEnum.INPOST })
  deliveryType: DeliveryTypeEnum;

  @Column({ default: PaymentMethodEnum.BLIK })
  paymentMethod: PaymentMethodEnum;

  @Column({ default: OrderStatusEnum.NEW })
  status: OrderStatusEnum;

  @Column({ nullable: true, type: 'json' })
  invoiceData: Record<string, string | number>;

  @Column({ nullable: true, type: 'json' })
  deliveryAddress: Record<string, string | number>;
}
