import { StepAuthenticationCode } from '@screens/SignUp/flow-steps/authenticationCode';
import { StepReferralCode } from '@screens/SignUp/flow-steps/referralCode';
import { StepReferralCodeApplied } from '@screens/SignUp/flow-steps/referralCodeApplied';
import { StepRegistrationValidation } from '@screens/SignUp/flow-steps/registrationValidation';
import { StepPassword } from '@screens/SignUp/flow-steps/stepPassword';
import { RegisterFormFields } from '@screens/SignUp/SignUp.types';
import { createFormFlow } from 'reinvest-app-common/src/form-flow/index';

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
