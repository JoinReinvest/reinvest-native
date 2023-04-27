import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { RegisterFormFields } from '../types';
import { StepAuthenticationCode } from './authenticationCode';
import { StepReferralCode } from './referralCode';
import { StepReferralCodeApplied } from './referralCodeApplied';
import { StepRegistrationValidation } from './registrationValidation';
import { StepPassword } from './stepPassword';

export const FLOW_STEPS = [StepReferralCode, StepReferralCodeApplied, StepPassword, StepAuthenticationCode, StepRegistrationValidation];

export const formFieldsInitialState = {
  email: '',
  referralCode: '',
  password: '',
  authenticationCode: '',
};

const [useRegisterFormFlow, RegisterFormFlowProvider] = createFormFlow<RegisterFormFields>({
  steps: FLOW_STEPS,
});

export { RegisterFormFlowProvider, useRegisterFormFlow };
