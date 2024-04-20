import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/common/entities/user.entity';
import { Order } from '@/common/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
