import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { InvestFormFields } from '../types';
import { Agreements } from './agreements';
import { DividendReinvesting } from './dividendReinvesting';
import { Initialise } from './initialise';
import { OneTimeInvestment } from './oneTimeInvestment';
import { RecurringDates } from './recurringDates';
import { RecurringDepositSchedule } from './recurringDepositSchedule';
import { RecurringInterval } from './recurringInterval';
import { RecurringAmount } from './recurringInvestmentAmount';
import { RecurringInvestmentInfo } from './recurringInvestmentInfo';
import { VerifyInvestment } from './verifyInvestment';

export const FLOW_STEPS = [
  Initialise,
  OneTimeInvestment,
  RecurringInvestmentInfo,
  RecurringAmount,
  RecurringInterval,
  RecurringDates,
  RecurringDepositSchedule,
  DividendReinvesting,
  Agreements,
  VerifyInvestment,
];

export const investingFormFieldsInitialState: Omit<InvestFormFields, 'accountId'> = {
  source: 'JPMORGAN CHASE BANK, NA',
};

const [useInvestFlow, InvestFormFlowProvider] = createFormFlow<InvestFormFields>({
  steps: FLOW_STEPS,
});

export { InvestFormFlowProvider, useInvestFlow };
