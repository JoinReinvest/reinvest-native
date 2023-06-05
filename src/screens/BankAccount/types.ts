import { BankAccount } from 'reinvest-app-common/src/types/graphql';

export interface BankAccountFormFields {
  accountId?: string;
  bankAccount?: BankAccount;
  isUpdatingAccount?: boolean;
}
