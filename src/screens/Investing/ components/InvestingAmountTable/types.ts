import { AccountType } from 'reinvest-app-common/src/types/graphql';
export interface Props {
  accountType: AccountType;
  investmentType: 'recurring' | 'oneTime';
  setAmount: (amount: string) => void;
  amount?: number;
  bankAccount?: string;
  error?: string;
}
