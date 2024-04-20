import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/common/entities/user.entity';
import { resolve } from 'path';
import { Order } from '@/common/entities/order.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
  ) {}

  register(createAccountDto: CreateAccountDto) {}

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    const userOrders = await this.ordersRepository.find({
      where: { userId: id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      ...user,
      orders: userOrders,
    };
  }

  // update(id: number, updateAccountDto: UpdateAccountDto) {
  //   return `This action updates a #${id} account`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} account`;
  // }
}
