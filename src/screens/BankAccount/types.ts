import { BankAccount } from 'reinvest-app-common/src/types/graphql';

import { BankAccountSourceScreens } from '../../navigation/LogInNavigator/types';

export interface BankAccountFormFields {
  accountId?: string;
  bankAccount?: BankAccount;
  isUpdatingAccount?: boolean;
  sourceScreen?: BankAccountSourceScreens;
}
