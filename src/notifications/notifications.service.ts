import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Observable, fromEvent, map } from 'rxjs';
import { Order } from 'src/common/entities/order.entity';
import { OrderActionType } from 'src/common/enums/OrderActionType.enum';

@Injectable()
export class NotificationsService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @OnEvent(OrderActionType.CREATED)
  async notifyUser(payload: Order): Promise<void> {
    console.log('Order created', payload);
    // push notification to front/admin
  }
}
