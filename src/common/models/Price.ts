import { ApiProperty } from '@nestjs/swagger';
import { CurrencyEnum } from '../enums/Currency.enum';

export abstract class Price {
  @ApiProperty()
  currency: CurrencyEnum;

  @ApiProperty()
  value: number;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date | null;
  @ApiProperty()
  isCurrent: boolean;
}
