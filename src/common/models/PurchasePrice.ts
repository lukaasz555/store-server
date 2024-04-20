import { CurrencyEnum } from '../enums/Currency.enum';

export class PurchasePrice {
  currency: CurrencyEnum = CurrencyEnum.PLN;
  value: number;
}
