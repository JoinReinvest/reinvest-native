import {StepPhoneAuthentication} from './stepPhoneAuthentication';
import {OnboardingFormFields} from '../types';
import {createFormFlow} from 'reinvest-app-common/src/services/form-flow/index';
import {StepFullName} from './stepFullName';
import {StepAccountType} from './stepAccountType';
import {StepPhoneNumber} from './stepPhoneNumber';

export const FLOW_STEPS = [
  StepAccountType,
  StepFullName,
  StepPhoneNumber,
  StepPhoneAuthentication,
];

export const onboardingFormFieldsInitialState: OnboardingFormFields = {
  accountType: undefined,
  firstName: undefined,
  middleName: undefined,
  lastName: undefined,
  phoneNumber: undefined,
  _hasAuthenticatedPhoneNumber: false,
};

const [useOnboardingFormFlow, OnboardingFormFlowProvider] =
  createFormFlow<OnboardingFormFields>({
    steps: FLOW_STEPS,
  });

export {OnboardingFormFlowProvider, useOnboardingFormFlow};
