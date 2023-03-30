import { StepCheckYourPhone } from '@screens/SignIn/flow-steps/checkYourPhone';
import { LoginFormFields } from '@screens/SignIn/types';
import { createFormFlow } from 'reinvest-app-common/src/services/form-flow/index';

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
