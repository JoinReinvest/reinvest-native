import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { UpdateIncomeAndNetWorthFormFields } from '../form-fields';
import { StepOriginalIncomeAndNetWorth } from './stepOriginalIncomeAndNetWorth';
import { StepUpdateNetWorthAndNetIncome } from './stepUpdateIncomeAndNetWorth';

export const FLOW_STEPS = [StepOriginalIncomeAndNetWorth, StepUpdateNetWorthAndNetIncome];

const [useUpdateIncomeAndNetWorthFlow, UpdateIncomeAndNetWorthFlowProvider] = createFormFlow<UpdateIncomeAndNetWorthFormFields>({
  steps: FLOW_STEPS,
});

export { UpdateIncomeAndNetWorthFlowProvider, useUpdateIncomeAndNetWorthFlow };
