import { createFormFlow } from 'reinvest-app-common/src/form-flow/index';

import { OnboardingFormFields } from '../types';
import { StepAccountType } from './stepAccountType';
import { StepFullName } from './stepFullName';

export const FLOW_STEPS = [StepAccountType, StepFullName];

export const onboardingFormFieldsInitialState: OnboardingFormFields = {
  accountType: undefined,
  firstName: undefined,
  middleName: undefined,
  lastName: undefined,
};

const [useOnboardingFormFlow, OnboardingFormFlowProvider] = createFormFlow<OnboardingFormFields>({
  steps: FLOW_STEPS,
});

export { OnboardingFormFlowProvider, useOnboardingFormFlow };
