import { createFormFlow } from 'reinvest-app-common/src/services/form-flow/index';

import { ResetPasswordFormFields } from '../types';
import { StepAuthenticationCode } from './stepAuthenticationCode';
import { StepChangePasswordConfirm } from './stepChangePasswordConfirm';
import { StepEmail } from './stepEmail';
import { StepNewPassword } from './stepNewPassword';

export const FLOW_STEPS = [StepEmail, StepAuthenticationCode, StepNewPassword, StepChangePasswordConfirm];

export const initialSteps = {
  email: '',
  password: '',
  authenticationCode: '',
};

const [useResetPasswordFormFlow, ResetPasswordFormFlowProvider] = createFormFlow<ResetPasswordFormFields>({
  steps: FLOW_STEPS,
});

export { ResetPasswordFormFlowProvider, useResetPasswordFormFlow };
