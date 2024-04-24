import { Order } from '@/common/entities/order.entity';
import { User } from '@/common/entities/user.entity';

export class FindUserDto {
  id: number;
  email: string;
  name?: string | null;
  lastname?: string | null;
  orders: Order[] = [];
  createdAt: string;
  favoriteProductsIds: number[] = [];

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.lastname = user.lastname;
    this.orders = user.orders;
    this.createdAt = user.createdAt;
    this.favoriteProductsIds = user.favoriteProductsIds;
  }

  setOrders(orders: Order[]): this {
    this.orders = orders;
    return this;
  }
}
