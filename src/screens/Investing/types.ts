import { Maybe } from 'graphql/jsutils/Maybe';
import { BankAccount, RecurringInvestmentFrequency } from 'reinvest-app-common/src/types/graphql';

export interface InvestFormFields {
  accountId: string;
  source: string;
  _shouldDisplayRecurringInvestment?: boolean;
  addingAccount?: boolean;
  automaticDividendReinvestmentAgreement?: boolean;
  bankAccount?: BankAccount;
  initialInvestment?: boolean;
  investAmount?: number;
  isRecurringInvestment?: boolean;
  oneTimeInvestmentId?: string;
  recurringInvestment?: Partial<RecurringInvestmentDetails>;
  recurringInvestmentId?: string;
  subscriptionAgreementId?: Maybe<string>;
}

export type RecurringInvestmentDetails = { endDate: string; interval: RecurringInvestmentFrequency; recurringAmount: number; startingDate: string };
