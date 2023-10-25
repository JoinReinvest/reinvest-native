import { AmountsOption } from 'reinvest-app-common/src/constants/investment-amounts';
import { AccountType } from 'reinvest-app-common/src/types/graphql';

export interface Props {
  accountType: AccountType;
  presetAmounts: AmountsOption[];
  setAmount: (amount: string) => void;
  accountId?: string;
  amount?: number;
  bankAccount?: string;
  error?: string;
  isRecurring?: boolean;
}
