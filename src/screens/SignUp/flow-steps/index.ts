import {StepPassword} from '@screens/SignUp/flow-steps/stepPassword';
import {StepAuthenticationCode} from '@screens/SignUp/flow-steps/authenticationCode';
import {StepRegistrationValidation} from '@screens/SignUp/flow-steps/registrationValidation';
import {createFormFlow} from 'reinvest-app-common/src/services/form-flow/index';
import {RegisterFormFields} from '@screens/SignUp/types';

export const FLOW_STEPS = [
  // StepReferralCode,
  // StepReferralCodeApplied,
  StepPassword,
  StepAuthenticationCode,
  StepRegistrationValidation,
];

export const formFieldsInitialState = {
  email: 'sdfa@wp.pl',
  referralCode: '',
  password: '',
  authenticationCode: '',
};

const [useRegisterFormFlow, RegisterFormFlowProvider] =
  createFormFlow<RegisterFormFields>({
    steps: FLOW_STEPS,
  });

export {RegisterFormFlowProvider, useRegisterFormFlow};
