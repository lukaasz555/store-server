import { NotificationActionEnum } from '../enums/NotificationAction.enum';

export class Notification<T> {
  type: NotificationActionEnum;
  item: T;
  createdAt = new Date();
  readAt: Date | null = null;

  constructor(type: NotificationActionEnum, item: T) {
    this.type = type;
    this.item = item;
  }

  toString(): string {
    return JSON.stringify({ type: this.type, payload: this.item });
  }
}
