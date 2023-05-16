import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { LoginFormFields } from '../types';
import { StepCheckYourPhone } from './checkYourPhone';

export const FLOW_STEPS = [StepCheckYourPhone];

export const initialSteps = {
  email: '',
  password: '',
  authenticationCode: '',
};

const [useLoginFormFlow, LoginFormFlowProvider] = createFormFlow<LoginFormFields>({
  steps: FLOW_STEPS,
});

export { LoginFormFlowProvider, useLoginFormFlow };
