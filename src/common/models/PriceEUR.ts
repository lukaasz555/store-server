import { CurrencyEnum } from '../enums/Currency.enum';
import { Price } from './Price';

export class PriceEUR extends Price {
  currency = CurrencyEnum.EUR;
  value = 0;
  startDate = new Date();
  endDate = null;
  isCurrent = true;
}
