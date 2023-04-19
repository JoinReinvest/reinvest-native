import { createFormFlow } from 'reinvest-app-common/src/services/form-flow/index';

import { OnboardingFormFields } from '../types';
import { StepAccountType } from './stepAccountType';
import { StepAccreditedInvestor } from './stepAccreditedInvestor';
import { StepAuthorizedSignatoryEntity } from './stepAuthorizedSignatoryEntity';
import { StepCompanyTickerSymbols } from './stepCompanyTickerSymbols';
import { StepCompliance } from './stepCompliance';
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
  StepTrustLegalName,
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
  StepCorporationType,
  StepTrustType,
  StepCorporationLegalName,
  StepTrustLegalName,
  StepAuthorizedSignatoryEntity,
  StepEIN,
  // businessAddress
  StepCorporationInformation,
  StepDocumentsForCorporation,
  StepDocumentsForTrust,
  StepTrustApplicantList,
  StepCorporateApplicantList,
  StepEmploymentStatus,
  StepEmploymentDetails,
  StepNetWorthAndNetIncome,
  StepProfilePicture,
];

export const onBoardingFormFieldsInitialState: OnboardingFormFields = {
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
  permanentAddress: undefined,
  identificationDocument: undefined,
  _didDocumentIdentificationValidationSucceed: false,
  isAccreditedInvestor: undefined,
  isAuthorizedSignatoryEntity: undefined,
  seniorPoliticalFigure: undefined,
  corporationType: undefined,
  corporationAnnualRevenue: undefined,
  corporationIndustry: undefined,
  corporationNumberOfEmployees: undefined,
  corporationLegalName: undefined,
  ein: undefined,
  domicile: undefined,
};

const [useOnboardingFormFlow, OnboardingFormFlowProvider] = createFormFlow<OnboardingFormFields>({
  steps: FLOW_STEPS,
});

export { OnboardingFormFlowProvider, useOnboardingFormFlow };
