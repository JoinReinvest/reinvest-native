import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { InvestFormFields } from '../types';
import { InitialInvestment } from './initialInvestment';
import { RecurringInvestment } from './recurringInvestment';

export const FLOW_STEPS = [InitialInvestment, RecurringInvestment];

export const onBoardingFormFieldsInitialState: InvestFormFields = {};

const [useInvestFlow, InvestFormFlowProvider] = createFormFlow<InvestFormFields>({
  steps: FLOW_STEPS,
});

export { InvestFormFlowProvider, useInvestFlow };
