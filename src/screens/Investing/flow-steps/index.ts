import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { InvestFormFields } from '../types';
import { InitialInvestment } from './initialInvestment';
import { RecurringInvestment } from './recurringInvestment';
import { VerifyInvestment } from './verifyInvestment';

export const FLOW_STEPS = [InitialInvestment, RecurringInvestment, VerifyInvestment];

export const onBoardingFormFieldsInitialState: InvestFormFields = {};

const [useInvestFlow, InvestFormFlowProvider] = createFormFlow<InvestFormFields>({
  steps: FLOW_STEPS,
});

export { InvestFormFlowProvider, useInvestFlow };
