import { OrderActionType } from '../enums/OrderActionType.enum';

export class Notification {
  type: OrderActionType;
  payload: unknown;

  constructor(type: OrderActionType, payload: unknown) {
    this.type = type;
    this.payload = payload;
  }

  toString(): string {
    return JSON.stringify({ type: this.type, payload: this.payload });
  }
}
