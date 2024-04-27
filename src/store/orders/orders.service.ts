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
import { OrderActionType } from 'src/common/enums/OrderActionType.enum';
import { Order } from 'src/common/entities/order.entity';
import { Product } from 'src/common/entities/product.entity';
import { OrderFactory } from 'src/common/factories/order.factory';
import { OrderStatusEnum } from '@/common/enums/OrderStatus.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    private eventEmitter: EventEmitter2,
  ) {}

  async getOrders(userId: number): Promise<Order[]> {
    const orders = await this.ordersRepository.find({
      where: { userId },
      relations: ['products'],
    });
    return orders;
  }

  async getOrder(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({ id });
    if (order) {
      return order;
    } else {
      throw new NotFoundException('Order not found');
    }
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
    this.eventEmitter.emit(OrderActionType.CREATED, newOrderToSave);
  }

  async deleteOrder(orderId: number): Promise<void> {
    await this.ordersRepository.delete({ id: orderId });
    this.eventEmitter.emit(OrderActionType.DELETED, {
      action: OrderActionType.DELETED,
      payload: orderId,
    });
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
  }
}
