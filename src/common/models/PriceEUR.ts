import { Expose } from 'class-transformer';
import { CurrencyEnum } from '../enums/Currency.enum';
import { Price } from './Price';

export class PriceEUR extends Price {
  @Expose()
  currency = CurrencyEnum.EUR;
  @Expose()
  value = 0;
  @Expose()
  startDate = new Date();
  @Expose()
  endDate = null;
  @Expose()
  isCurrent = true;
}
