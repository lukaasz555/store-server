import { CurrencyEnum } from '../enums/Currency.enum';
import { Price } from './Price';

export class PricePLN extends Price {
  currency = CurrencyEnum.PLN;
  value = 0;
  startDate = new Date();
  endDate = null;
  isCurrent = true;
}
