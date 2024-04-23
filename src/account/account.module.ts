import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/common/entities/user.entity';
import { Order } from '@/common/entities/order.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { RefreshToken } from '@/common/entities/refreshToken.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Order, RefreshToken]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
