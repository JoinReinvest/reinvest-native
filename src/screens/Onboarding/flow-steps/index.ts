import {StepPhoneAuthentication} from './stepPhoneAuthentication';
import {StepDateOfBirth} from './stepDateOfBirth';
import {OnboardingFormFields} from '../types';
import {createFormFlow} from 'reinvest-app-common/src/services/form-flow/index';
import {StepFullName} from './stepFullName';
import {StepAccountType} from './stepAccountType';
import {StepPhoneNumber} from './stepPhoneNumber';
import {StepResidencyStatus} from '@screens/Onboarding/flow-steps/stepResidencyStatus';
import {StepResidencyGreenCard} from '@screens/Onboarding/flow-steps/stepResidencyGreenCard';
import {StepResidencyVisa} from '@screens/Onboarding/flow-steps/stepResidencyVisa';

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

const [useOnboardingFormFlow, OnboardingFormFlowProvider] =
  createFormFlow<OnboardingFormFields>({
    steps: FLOW_STEPS,
  });

export {OnboardingFormFlowProvider, useOnboardingFormFlow};
