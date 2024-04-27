import { OrderActionType } from '@/common/enums/OrderActionType.enum';
import { Controller, MessageEvent, Res, Sse } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';
import { Observable, fromEvent, map } from 'rxjs';
import { NotificationsService } from './notifications.service';
import { Notification } from '@/common/models/Notification';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  // @Sse('events')
  // @OnEvent(OrderActionType.CREATED)
  // onCreatedOrder(): Observable<MessageEvent> {
  //   // const notification = new Notification(OrderActionType.CREATED, payload);

  //   return fromEvent(this.eventEmitter, OrderActionType.CREATED).pipe(
  //     map((payload) => {
  //       return {
  //         data: JSON.stringify({ payload, type: OrderActionType.CREATED }),
  //       };
  //     }),
  //   );
  // }

  @Sse('events')
  @OnEvent(OrderActionType.TESTORDER)
  sseTest(): Observable<MessageEvent> {
    console.log('sseTest in notificationsController');

    return fromEvent(this.eventEmitter, OrderActionType.TESTORDER).pipe(
      map((payload) => ({
        type: OrderActionType.TESTORDER,
        data: JSON.stringify({ payload, type: OrderActionType.TESTORDER }),
      })),
    );
    // return fromEvent(this.eventEmitter, OrderActionType.TESTORDER).pipe(
    //   map((payload) => ({
    //     data: JSON.stringify({ payload, type: OrderActionType.TESTORDER }),
    //   })),
    // );
  }
}
