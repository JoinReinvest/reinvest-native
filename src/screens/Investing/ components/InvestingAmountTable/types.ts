import { AccountType } from 'reinvest-app-common/src/types/graphql';

export interface Props {
  accountType: AccountType;
  setAmount: (amount: string) => void;
  accountId?: string;
  amount?: number;
  bankAccount?: string;
  error?: string;
  isRecurring?: boolean;
}
