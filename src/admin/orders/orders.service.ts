import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../common/entities/order.entity';
import { In, Repository } from 'typeorm';
import { NewOrderDto } from '../../common/dtos/NewOrder.dto';
import { instanceToPlain } from 'class-transformer';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Product } from 'src/common/entities/product.entity';
import { OrderFactory } from 'src/common/factories/order.factory';
import { NotificationActionEnum } from '@/common/enums/NotificationAction.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    private eventEmitter: EventEmitter2,
  ) {}

  async getOrders(): Promise<Order[]> {
    try {
      return this.ordersRepository.find({ relations: ['products'] });
    } catch {
      throw new HttpException(
        'Internal server error:(',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
  }

  async deleteOrder(orderId: number): Promise<void> {
    await this.ordersRepository.delete({ id: orderId });
    this.eventEmitter.emit(NotificationActionEnum.ORDER_DELETED, {
      action: NotificationActionEnum.ORDER_DELETED,
      payload: orderId,
    });
  }
}
