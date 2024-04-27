import { OrderActionType } from '../enums/OrderActionType.enum';

export class Notification {
  type: OrderActionType;
  payload: Record<string, unknown>;

  constructor(type: OrderActionType, payload: Record<string, unknown>) {
    this.type = type;
    this.payload = payload;
  }

  toString(): string {
    return JSON.stringify({ type: this.type, payload: this.payload });
  }
}
