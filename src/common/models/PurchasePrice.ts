import { ApiProperty } from '@nestjs/swagger';
import { CurrencyEnum } from '../enums/Currency.enum';

export class PurchasePrice {
  @ApiProperty()
  currency: CurrencyEnum = CurrencyEnum.PLN;
  @ApiProperty()
  value: number;
}
