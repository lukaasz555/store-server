import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Headers,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { User } from '@/common/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '@/common/entities/order.entity';
import { FindUserDto } from './dto/find-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  @Post('register')
  register(@Body() createAccountDto: CreateAccountDto): Promise<void> {
    return this.accountService.createUser(createAccountDto);
  }

  @Post('login')
  login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ token: string; refreshToken: string }> {
    return this.accountService.loginUser(loginUserDto);
  }

  @Get()
  findUser(@Headers('userId') userId: string): Promise<FindUserDto> {
    return this.accountService.findUser(+userId);
  }

  @Patch('')
  updateUser(
    @Headers('userId') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<void> {
    // return this.accountService.update(+id, updateAccountDto);
    return new Promise((resolve) => {
      resolve();
    });
  }
}
