import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from '../../common/entities/order.entity';
import { NewOrderDto } from '../../common/dtos/NewOrder.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin/orders')
@Controller('admin/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrders(): Promise<Order[]> {
    return this.ordersService.getOrders();
  }

  @Get(':id')
  getOrder(@Param('id') id: number): Promise<Order> {
    return this.ordersService.getOrder(id);
  }

  @Post()
  createOrder(@Body() order: NewOrderDto): Promise<void> {
    return this.ordersService.createOrder(order);
  }

  // TODO: add edit/delete endpoints

  @Delete(':id')
  deleteOrder(@Param('id') id: number): Promise<void> {
    return this.ordersService.deleteOrder(id);
  }
}
