import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { User } from '@/common/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '@/common/entities/order.entity';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  // @Post()
  // register(@Body() createAccountDto: CreateAccountDto): Promise<void> {
  //   return this.accountService.register(createAccountDto);
  // }

  // @Post()
  // login(@Body() loginUserDto: LoginUserDto): Promise<string> {
  //   return this.accountService.login(loginUserDto);
  // }

  @Get(':id')
  findUser(@Param('id') id: string): Promise<User> {
    return this.accountService.findOne(+id);
  }

  // @Patch(':id')
  // updateUser(
  //   @Param('id') id: string,
  //   @Body() updateAccountDto: UpdateAccountDto,
  // ): Promise<void> {
  //   return this.accountService.update(+id, updateAccountDto);
  // }
}
