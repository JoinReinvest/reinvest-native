import { createFormFlow } from 'reinvest-app-common/src/services/form-flow/';

import { OnboardingFormFields } from '../types';
import { StepAccountType } from './stepAccountType';
import { StepDateOfBirth } from './stepDateOfBirth';
import { StepFullName } from './stepFullName';
import { StepPhoneAuthentication } from './stepPhoneAuthentication';
import { StepPhoneNumber } from './stepPhoneNumber';
import { StepResidencyGreenCard } from './stepResidencyGreenCard';
import { StepResidencyStatus } from './stepResidencyStatus';
import { StepResidencyVisa } from './stepResidencyVisa';

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
