import { Maybe } from 'graphql/jsutils/Maybe';
import { RecurringInvestmentInterval } from 'reinvest-app-common/src/constants/recurring-investment-intervals';
import { BankAccount } from 'reinvest-app-common/src/types/graphql';

export interface InvestFormFields {
  accountId: string;
  source: string;
  addingAccount?: boolean;
  automaticDividendReinvestmentAgreement?: boolean;
  bankAccount?: BankAccount;
  initialInvestment?: boolean;
  investAmount?: string;
  isRecurringInvestment?: boolean;
  oneTimeInvestmentId?: string;
  recurringInvestment?: Partial<RecurringInvestmentDetails>;
  recurringInvestmentId?: string;
  subscriptionAgreementId?: Maybe<string>;
}

export type RecurringInvestmentDetails = { endDate: string; interval: RecurringInvestmentInterval; recurringAmount: string; startingDate: string };
