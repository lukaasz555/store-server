import { OrderNotification } from '@/common/entities/OrderNotification.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(OrderNotification)
    private notificationsRepository: Repository<OrderNotification>,
  ) {}

  async createNotification(notification: OrderNotification): Promise<void> {
    await this.notificationsRepository.save(notification);
  }

  async markAsRead(notificationIds: number[]): Promise<void> {
    // ...
  }
}
