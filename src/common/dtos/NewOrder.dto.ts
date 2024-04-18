import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  Min,
} from 'class-validator';
import { DeliveryTypeEnum } from 'src/common/enums/DeliveryType.enum';
import { OrderStatusEnum } from 'src/common/enums/OrderStatus.enum';
import { PaymentMethodEnum } from 'src/common/enums/PaymentMethod.enum';

export class NewOrderDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  productsIds: number[];

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  productsCost: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  shippingCost: number;

  @IsEnum(DeliveryTypeEnum)
  @IsNotEmpty()
  deliveryType: DeliveryTypeEnum;

  @IsEnum(PaymentMethodEnum)
  @IsNotEmpty()
  paymentMethod: PaymentMethodEnum;

  @IsEnum(OrderStatusEnum)
  status = OrderStatusEnum.NEW;

  @IsOptional()
  @IsObject()
  invoiceData = null;

  @IsOptional()
  @IsObject()
  deliveryAddress = null;
}
