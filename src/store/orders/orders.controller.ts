import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from '../../common/entities/order.entity';
import { NewOrderDto } from '../../common/dtos/NewOrder.dto';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('store/orders')
@Controller('store/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrders(@Req() request: Request): Promise<Order[]> {
    const userId = request.headers['userid'];
    if (userId) {
      return this.ordersService.getOrders(Number(userId));
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User ID is missing in the request headers',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  getOrder(@Param('id') id: number): Promise<Order> {
    return this.ordersService.getOrder(id);
  }

  @Post()
  createOrder(@Body() order: NewOrderDto): Promise<void> {
    return this.ordersService.createOrder(order);
  }

  // TODO: add cancel order endpoint
}
