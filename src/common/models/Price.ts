import { CurrencyEnum } from '../enums/Currency.enum';

export abstract class Price {
  currency: CurrencyEnum;
  value: number;
  startDate: Date;
  endDate: Date | null;
  isCurrent: boolean;
}
