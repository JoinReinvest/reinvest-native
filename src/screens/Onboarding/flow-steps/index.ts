import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { OnboardingFormFields } from '../types';
import { StepAccountType } from './stepAccountType';
import { StepAccreditedInvestor } from './stepAccreditedInvestor';
import { StepAuthorizedSignatoryEntity } from './stepAuthorizedSignatoryEntity';
import { StepBusinessAddress } from './stepBusinessAddress';
import { StepCompanyTickerSymbols } from './stepCompanyTickerSymbols';
import { StepCompliance } from './stepCompliance';
import { StepCongratulations } from './stepCongratulations';
import { StepCorporateApplicantList } from './stepCorporateApplicantList';
import { StepCorporationInformation } from './stepCorporationInformation';
import { StepCorporationLegalName } from './stepCorporationLegalName';
import { StepCorporationType } from './stepCorporationType';
import { StepDateOfBirth } from './stepDateOfBirth';
import { StepDocumentsForCorporation } from './stepDocumentsForCorporation';
import { StepDocumentsForTrust } from './stepDocumentsForTrust';
import { StepEIN } from './stepEIN';
import { StepEmploymentDetails } from './stepEmploymentDetails';
import { StepEmploymentStatus } from './stepEmploymentStatus';
import { StepExperience } from './stepExperience';
import { StepFinraInstitution } from './stepFinra';
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
import { StepTrustApplicantList } from './stepTrustApplicantList';
import { StepTrustLegalName } from './stepTrustLegalName';
import { StepTrustType } from './stepTrustType';

export const FLOW_STEPS = [
  StepAccountType,
  //profile steps
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
  StepAccreditedInvestor,
  StepExperience,
  // individual steps
  StepEmploymentStatus,
  StepEmploymentDetails,
  StepNetWorthAndNetIncome,
  // corporation  steps
  StepCorporationType,
  StepCorporationLegalName,
  // trust steps
  StepTrustType,
  StepTrustLegalName,
  //trust and corporation steps
  StepAuthorizedSignatoryEntity,
  StepEIN,
  StepBusinessAddress,
  StepCorporationInformation,
  // trust documents
  StepDocumentsForTrust,
  // corporation documents
  StepDocumentsForCorporation,
  // trust applicants
  StepTrustApplicantList,
  //corporation applicants
  StepCorporateApplicantList,
  // last step
  StepProfilePicture,
  StepCongratulations,
];

export const onboardingTCRelatedFields: Partial<OnboardingFormFields> = {
  businessAddress: undefined,
  ein: undefined,
  fiduciaryEntityInformation: undefined,
  isAuthorizedSignatoryEntity: undefined,
};

export const onBoardingFormFieldsInitialState: OnboardingFormFields = {
  _skipStakeholders: true,
  address: null,
  isCompletedProfile: false,
  accountType: undefined,
  name: { firstName: '', lastName: '' },
  _hasAuthenticatedPhoneNumber: false,
  residency: null,
  birthCountry: '',
  citizenshipCountry: '',
  dateOfBirth: null,
  finraInstitution: undefined,
  profilePicture: undefined,
  ssn: undefined,
  experience: null,
  netIncome: undefined,
  netWorth: undefined,
  employmentStatus: undefined,
  employer: undefined,
  companyTickerSymbols: undefined,
  identificationDocument: undefined,
  _didDocumentIdentificationValidationSucceed: false,
  isAccreditedInvestor: undefined,
  seniorPoliticalFigure: undefined,
  corporationType: undefined,
  corporationLegalName: undefined,
  ...onboardingTCRelatedFields,
};

const [useOnboardingFormFlow, OnboardingFormFlowProvider] = createFormFlow<OnboardingFormFields>({
  steps: FLOW_STEPS,
});

export { OnboardingFormFlowProvider, useOnboardingFormFlow };
