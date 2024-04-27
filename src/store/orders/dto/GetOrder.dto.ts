import { Order } from '@/common/entities/order.entity';
import { DeliveryTypeEnum } from '@/common/enums/DeliveryType.enum';
import { OrderStatusEnum } from '@/common/enums/OrderStatus.enum';
import { PaymentMethodEnum } from '@/common/enums/PaymentMethod.enum';

export class GetOrderDto {
  id: number;
  productsIds: number[];
  productsCost: number;
  shippingCost: number;
  deliveryType: DeliveryTypeEnum;
  status: OrderStatusEnum;
  paymentMethod: PaymentMethodEnum;
  invoiceData: Record<string, string | number> | null;
  discountCode: Record<string, string | number> | null;
  deliveryAddress: Record<string, string | number> | null;
  totalPrice: number;

  constructor(order: Order) {
    this.id = order.id;
    this.productsIds = order.products.map((product) => product.id);
    this.productsCost = order.productsCost;
    this.shippingCost = order.shippingCost;
    this.deliveryType = order.deliveryType;
    this.status = order.status;
    this.paymentMethod = order.paymentMethod;
    this.invoiceData = order.invoiceData;
    this.discountCode = order.discountCode;
    this.deliveryAddress = order.deliveryAddress;
    this.totalPrice = order.productsCost + order.shippingCost;
  }
}
