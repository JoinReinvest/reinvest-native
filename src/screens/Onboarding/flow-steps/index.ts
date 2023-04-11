import { createFormFlow } from 'reinvest-app-common/src/services/form-flow/index';

import { StepCompliance } from '../../Onboarding/flow-steps/stepCompliance';
import { StepFinraInstitution } from '../../Onboarding/flow-steps/stepFinra';
import { OnboardingFormFields } from '../types';
import { StepAccountType } from './stepAccountType';
import { StepAccreditedInvestor } from './stepAccreditedInvestor';
import { StepAuthorizedSignatoryEntity } from './stepAuthorizedSignatoryEntity';
import { StepCompanyTickerSymbols } from './stepCompanyTickerSymbols';
import { StepCorporationType } from './stepCorporationType';
import { StepDateOfBirth } from './stepDateOfBirth';
import { StepEmploymentDetails } from './stepEmploymentDetails';
import { StepEmploymentStatus } from './stepEmploymentStatus';
import { StepExperience } from './stepExperience';
import { StepFullName } from './stepFullName';
import { StepIdentificationDocuments } from './stepIdentificationDocuments';
import { StepNetWorthAndNetIncome } from './stepNetWorthAndNetIncome';
import { StepPermanentAddress } from './stepPermanentAddress';
import { StepPhoneAuthentication } from './stepPhoneAuthentication';
import { StepPhoneNumber } from './stepPhoneNumber';
import { StepProfilePicture } from './stepProfilePicture';
import { StepResidencyGreenCard } from './stepResidencyGreenCard';
import { StepResidencyStatus } from './stepResidencyStatus';
import { StepResidencyVisa } from './stepResidencyVisa';
import { StepSeniorPoliticalFigure } from './stepSeniorPoliticalFigure';
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
  StepCompanyTickerSymbols,
  StepSeniorPoliticalFigure,
  StepSSN,
  StepIdentificationDocuments,
  StepPermanentAddress,
  StepAuthorizedSignatoryEntity,
  StepAccreditedInvestor,
  StepExperience,
  StepCorporationType,
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
  companyTickerSymbols: undefined,
  permanentAddress: null,
  identificationDocument: undefined,
  _didDocumentIdentificationValidationSucceed: false,
  isAccreditedInvestor: undefined,
  isAuthorizedSignatoryEntity: undefined,
  seniorPoliticalFigure: undefined,
  corporationType: undefined,
};

const [useOnboardingFormFlow, OnboardingFormFlowProvider] = createFormFlow<OnboardingFormFields>({
  steps: FLOW_STEPS,
});

export { OnboardingFormFlowProvider, useOnboardingFormFlow };
