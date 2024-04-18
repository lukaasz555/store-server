import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Order } from 'src/common/entities/order.entity';
import { OrderActionType } from 'src/common/enums/OrderActionType.enum';

@Injectable()
export class NotificationsService {
  constructor() {}

  @OnEvent(OrderActionType.CREATED)
  async notifyUser(payload: Order): Promise<void> {
    console.log('Order created', payload);
  }
}
