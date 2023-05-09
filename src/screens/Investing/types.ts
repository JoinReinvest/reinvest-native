import { RecurringInvestmentInterval } from 'reinvest-app-common/src/constants/recurring-investment-intervals';

export interface InvestFormFields {
  accountId: string;
  source: string;
  accountNumber?: string;
  investAmount?: string;
  isRecurringInvestment?: boolean;
  recurringInvestment?: Partial<RecurringInvestmentDetails>;
}

export type RecurringInvestmentDetails = { endDate: string; interval: RecurringInvestmentInterval; recurringAmount: string; startDate: string };
