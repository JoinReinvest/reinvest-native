import { createFormFlow } from 'reinvest-app-common/src/services/form-flow/index';

import { StepCompliance } from '../../Onboarding/flow-steps/stepCompliance';
import { StepFinraInstitution } from '../../Onboarding/flow-steps/stepFinra';
import { OnboardingFormFields } from '../types';
import { StepAccountType } from './stepAccountType';
import { StepDateOfBirth } from './stepDateOfBirth';
import { StepEmploymentDetails } from './stepEmploymentDetails';
import { StepEmploymentStatus } from './stepEmploymentStatus';
import { StepExperience } from './stepExperience';
import { StepFullName } from './stepFullName';
import { StepNetWorthAndNetIncome } from './stepNetWorthAndNetIncome';
import { StepPhoneAuthentication } from './stepPhoneAuthentication';
import { StepPhoneNumber } from './stepPhoneNumber';
import { StepProfilePicture } from './stepProfilePicture';
import { StepResidencyGreenCard } from './stepResidencyGreenCard';
import { StepResidencyStatus } from './stepResidencyStatus';
import { StepResidencyVisa } from './stepResidencyVisa';
import { StepSSN } from './stepSSN';

export const FLOW_STEPS = [
  StepAccountType,
  StepFullName,
  StepPhoneNumber,
  StepPhoneAuthentication,
  StepDateOfBirth,
  StepResidencyStatus,
  StepResidencyGreenCard,
  StepResidencyVisa,
  StepCompliance,
  StepFinraInstitution,
  StepSSN,
  StepExperience,
  StepEmploymentStatus,
  StepEmploymentDetails,
  StepNetWorthAndNetIncome,
  StepProfilePicture,
];

export const onBoardingFormFieldsInitialState: OnboardingFormFields = {
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
  finraInstitution: undefined,
  profilePicture: undefined,
  ssn: undefined,
  experience: undefined,
  netIncome: undefined,
  netWorth: undefined,
  employmentStatus: undefined,
  employmentDetails: undefined,
};

const [useOnboardingFormFlow, OnboardingFormFlowProvider] = createFormFlow<OnboardingFormFields>({
  steps: FLOW_STEPS,
});

export { OnboardingFormFlowProvider, useOnboardingFormFlow };
