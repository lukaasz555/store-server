import { NewOrderDto } from '../dtos/NewOrder.dto';
import { Order } from '../entities/order.entity';
import { Product } from '../entities/product.entity';

export class OrderFactory {
  static createOrder(order: NewOrderDto, products: Product[]): Order {
    const newOrder = new Order();

    newOrder.userId = order.userId;
    newOrder.products = products;
    newOrder.productsCost = order.productsCost;
    newOrder.shippingCost = order.shippingCost;
    newOrder.deliveryType = order.deliveryType;
    newOrder.paymentMethod = order.paymentMethod;
    newOrder.status = order.status;
    if (order.invoiceData) {
      newOrder.invoiceData = order.invoiceData;
    }
    if (order.deliveryAddress) {
      newOrder.deliveryAddress = order.deliveryAddress;
    }

    return newOrder;
  }
}
