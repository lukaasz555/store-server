import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { NewOrderDto } from '../../common/dtos/NewOrder.dto';
import { instanceToPlain } from 'class-transformer';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationActionEnum } from '@/common/enums/NotificationAction.enum';
import { Order } from 'src/common/entities/order.entity';
import { Product } from 'src/common/entities/product.entity';
import { OrderFactory } from 'src/common/factories/order.factory';
import { OrderStatusEnum } from '@/common/enums/OrderStatus.enum';
import { GetOrderDto } from './dto/GetOrder.dto';
import { GetOrdersDto } from './dto/GetOrders.dto';
import { Notification } from '@/common/models/Notification';
import { NotificationsService } from '@/notifications/notifications.service';
import { OrderNotification } from '@/common/entities/OrderNotification.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    private notificationsService: NotificationsService,
    private eventEmitter: EventEmitter2,
  ) {}

  async getOrders(userId: number): Promise<GetOrdersDto[]> {
    const orders = await this.ordersRepository.find({
      where: { userId },
      relations: ['products'],
    });
    const getOrdersDto = orders.map((order) => new GetOrdersDto(order));
    return getOrdersDto;
  }

  async getOrder(userId: number, orderId: number): Promise<GetOrderDto> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId, userId },
    });
    if (!order) throw new NotFoundException('Order not found');
    return new GetOrderDto(order);
  }

  async createOrder(order: NewOrderDto): Promise<void> {
    const orderProducts = await this.productsRepository.find({
      where: { id: In(order.productsIds) },
    });

    const newOrder = OrderFactory.createOrder(order, orderProducts);
    const newOrderToSave = this.ordersRepository.create(
      instanceToPlain(newOrder),
    );

    await this.ordersRepository.save(newOrderToSave);
    const notification = new Notification<Order>(
      NotificationActionEnum.ORDER_CREATED,
      newOrderToSave,
    );

    const orderNotification = new OrderNotification();
    orderNotification.type = notification.type;
    orderNotification.createdAt = notification.createdAt;
    orderNotification.order = newOrderToSave;
    this.notificationsService.createNotification(orderNotification);

    this.eventEmitter.emit('notification', notification);
  }

  async cancelOrder(userId: number, orderId: number): Promise<void> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId, userId },
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.status === OrderStatusEnum.CANCELLED) {
      throw new BadRequestException('Order already cancelled');
    }
    order.status = OrderStatusEnum.CANCELLED;
    await this.ordersRepository.save(order);
    const notification = new Notification<Order>(
      NotificationActionEnum.ORDER_CANCELLED,
      order,
    );

    const orderNotification = new OrderNotification();
    orderNotification.type = notification.type;
    orderNotification.createdAt = notification.createdAt;
    orderNotification.order = order;
    this.notificationsService.createNotification(orderNotification);

    this.eventEmitter.emit('notification', notification);
  }

  async sseTest(): Promise<void> {
    console.log('sse test in service');

    const notification = new Notification<{ [key: string]: string }>(
      NotificationActionEnum.ORDER_TEST,
      {
        testMessage: 'test notification123',
      },
    );

    this.eventEmitter.emit('notification', notification);
  }
}
