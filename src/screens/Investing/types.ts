import { Maybe } from 'graphql/jsutils/Maybe';
import { AccountType, BankAccount, RecurringInvestmentFrequency } from 'reinvest-app-common/src/types/graphql';

export interface InvestFormFields {
  accountId: string;
  _shouldDisplayRecurringInvestment?: boolean;
  accountSelectable?: boolean;
  accountType?: Maybe<AccountType>;
  addingAccount?: boolean;
  automaticDividendReinvestmentAgreement?: boolean;
  bankAccount?: BankAccount;
  initialInvestment?: boolean;
  investAmount?: number;
  isRecurringInvestment?: boolean;
  oneTimeInvestmentId?: string;
  recurringInvestment?: Partial<RecurringInvestmentDetails>;
  recurringInvestmentId?: string;
  skipOneTimeInvestment?: boolean;
  subscriptionAgreementId?: Maybe<string>;
}

export type RecurringInvestmentDetails = { endDate: string; interval: RecurringInvestmentFrequency; recurringAmount: number; startingDate: string };
