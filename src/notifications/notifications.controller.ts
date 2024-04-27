import { Controller, MessageEvent, Res, Sse } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';
import { Observable, fromEvent, map } from 'rxjs';
import { Notification } from '@/common/models/Notification';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Sse('events')
  @OnEvent('notification')
  pushNotification(): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, 'notification').pipe(
      map((payload: Notification) => ({
        data: payload.toString(),
      })),
    );
  }
}
