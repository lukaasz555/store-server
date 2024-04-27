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
import { GetOrderDto } from './dto/GetOrder.dto';
import { GetOrdersDto } from './dto/GetOrders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
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
    this.eventEmitter.emit(OrderActionType.CREATED, newOrderToSave);
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

  async sseTest(): Promise<void> {
    console.log('sse test');
    this.eventEmitter.emit(OrderActionType.TESTORDER, {
      test: 'test notification',
    });
  }
}
