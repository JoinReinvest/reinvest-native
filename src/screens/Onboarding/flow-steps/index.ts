import { StepResidencyGreenCard } from '@screens/Onboarding/flow-steps/stepResidencyGreenCard';
import { StepResidencyStatus } from '@screens/Onboarding/flow-steps/stepResidencyStatus';
import { StepResidencyVisa } from '@screens/Onboarding/flow-steps/stepResidencyVisa';
import { createFormFlow } from 'reinvest-app-common/src/services/form-flow/index';

import { OnboardingFormFields } from '../types';
import { StepAccountType } from './stepAccountType';
import { StepDateOfBirth } from './stepDateOfBirth';
import { StepFullName } from './stepFullName';
import { StepPhoneAuthentication } from './stepPhoneAuthentication';
import { StepPhoneNumber } from './stepPhoneNumber';

export const FLOW_STEPS = [
  StepAccountType,
  StepFullName,
  StepPhoneNumber,
  StepDateOfBirth,
  StepPhoneAuthentication,
  StepResidencyStatus,
  StepResidencyGreenCard,
  StepResidencyVisa,
];

export const onboardingFormFieldsInitialState: OnboardingFormFields = {
  accountType: undefined,
  firstName: undefined,
  middleName: undefined,
  lastName: undefined,
  phoneNumber: undefined,
  _hasAuthenticatedPhoneNumber: false,
  residency: undefined,
  birthCountry: '',
  citizenshipCountry: '',
  dateOfBirth: undefined,
};

const [useOnboardingFormFlow, OnboardingFormFlowProvider] = createFormFlow<OnboardingFormFields>({
  steps: FLOW_STEPS,
});

export { OnboardingFormFlowProvider, useOnboardingFormFlow };
