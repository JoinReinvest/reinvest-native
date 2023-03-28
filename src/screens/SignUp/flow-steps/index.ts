import {StepPassword} from './stepPassword';
import {StepAuthenticationCode} from './authenticationCode';
import {StepRegistrationValidation} from './registrationValidation';
import {createFormFlow} from 'reinvest-app-common/src/services/form-flow/index';
import {RegisterFormFields} from '@screens/SignUp/types';
import {StepReferralCodeApplied} from './referralCodeApplied';
import {StepReferralCode} from './referralCode';

export const FLOW_STEPS = [
  StepReferralCode,
  StepReferralCodeApplied,
  StepPassword,
  StepAuthenticationCode,
  StepRegistrationValidation,
];

export const formFieldsInitialState = {
  email: '',
  referralCode: '',
  password: '',
  authenticationCode: '',
};

const [useRegisterFormFlow, RegisterFormFlowProvider] =
  createFormFlow<RegisterFormFields>({
    steps: FLOW_STEPS,
  });

export {RegisterFormFlowProvider, useRegisterFormFlow};
