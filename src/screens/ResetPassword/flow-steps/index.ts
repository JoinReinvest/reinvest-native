import {StepEmail} from './stepEmail';
import {ResetPasswordFormFields} from '../types';
import {createFormFlow} from 'reinvest-app-common/src/form-flow/index';
import {StepAuthenticationCode} from './stepAuthenticationCode';
import {StepNewPassword} from './stepNewPassword';
import {StepChangePasswordConfirm} from './stepChangePasswordConfirm';

export const FLOW_STEPS = [
  StepEmail,
  StepAuthenticationCode,
  StepNewPassword,
  StepChangePasswordConfirm,
];

export const initialSteps = {
  email: '',
  password: '',
  authenticationCode: '',
};

const [useResetPasswordFormFlow, ResetPasswordFormFlowProvider] =
  createFormFlow<ResetPasswordFormFields>({
    steps: FLOW_STEPS,
  });

export {ResetPasswordFormFlowProvider, useResetPasswordFormFlow};
