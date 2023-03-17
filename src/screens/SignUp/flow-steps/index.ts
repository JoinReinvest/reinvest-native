import {StepPassword} from '@screens/SignUp/flow-steps/stepPassword';
import {StepReferralCodeApplied} from '@screens/SignUp/flow-steps/referralCodeApplied';
import {StepReferralCode} from '@screens/SignUp/flow-steps/referralCode';
import {StepAuthenticationCode} from '@screens/SignUp/flow-steps/authenticationCode';
import {StepRegistrationValidation} from '@screens/SignUp/flow-steps/registrationValidation';
import {createFormFlow} from 'reinvest-app-common/src/form-flow/index';
import {RegisterFormFields} from '@screens/SignUp/SignUp.types';

export const FLOW_STEPS = [
  StepReferralCode,
  StepReferralCodeApplied,
  StepPassword,
  StepAuthenticationCode,
  StepRegistrationValidation,
];

export const formFieldsInitialState = {
  email: 'asdga@wp.pl',
  referralCode: '',
  password: '',
  authenticationCode: '',
};

const [useRegisterFormFlow, RegisterFormFlowProvider] =
  createFormFlow<RegisterFormFields>({
    steps: FLOW_STEPS,
  });

export {RegisterFormFlowProvider, useRegisterFormFlow};
