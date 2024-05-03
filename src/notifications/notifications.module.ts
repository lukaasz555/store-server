import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderNotification } from '@/common/entities/OrderNotification.entity';
import { NotificationsService } from './notifications.service';

@Module({
  controllers: [NotificationsController],
  imports: [TypeOrmModule.forFeature([OrderNotification])],
  providers: [NotificationsService],
})
export class NotificationsModule {}
