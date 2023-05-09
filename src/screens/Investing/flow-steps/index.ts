import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { InvestFormFields } from '../types';
import { InitialInvestment } from './initialInvestment';
import { RecurringDates } from './recurringDates';
import { RecurringDepositSchedule } from './recurringDepositSchedule';
import { RecurringDividendReinvesting } from './recurringDividendReinvesting';
import { RecurringInterval } from './recurringInterval';
import { RecurringAmount } from './recurringInvestmentAmount';
import { RecurringInvestmentInfo } from './recurringInvestmentInfo';
import { VerifyInvestment } from './verifyInvestment';

export const FLOW_STEPS = [
  InitialInvestment,
  RecurringInvestmentInfo,
  RecurringAmount,
  RecurringInterval,
  RecurringDates,
  RecurringDepositSchedule,
  RecurringDividendReinvesting,
  VerifyInvestment,
];

export const investingFormFieldsInitialState: Omit<InvestFormFields, 'accountId'> = {
  source: 'JPMORGAN CHASE BANK, NA ****1234',
  accountNumber: '*** *** *** *** 00000',
};

const [useInvestFlow, InvestFormFlowProvider] = createFormFlow<InvestFormFields>({
  steps: FLOW_STEPS,
});

export { InvestFormFlowProvider, useInvestFlow };
