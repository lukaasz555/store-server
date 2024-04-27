import { Order } from '@/common/entities/order.entity';
import { OrderStatusEnum } from '@/common/enums/OrderStatus.enum';

export class GetOrdersDto {
  id: number;
  productsCost: number;
  shippingCost: number;
  status: OrderStatusEnum;
  totalPrice: number;

  constructor(order: Order) {
    this.id = order.id;
    this.productsCost = order.productsCost;
    this.shippingCost = order.shippingCost;
    this.status = order.status;
    this.totalPrice = order.productsCost + order.shippingCost;
  }
}
