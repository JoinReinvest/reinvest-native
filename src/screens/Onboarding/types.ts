import { Industry } from 'reinvest-app-common/src/constants/industries';
import { Address, DomicileType, DraftAccountType, Experience } from 'reinvest-app-common/src/types/graphql';
import { EmploymentStatus } from 'reinvest-app-common/src/types/graphql';

import { VisaType } from '../../types/visaType';

export interface OnboardingFormFields {
  permanentAddress: Address | null;
  _didDocumentIdentificationValidationSucceed?: boolean;
  _hasAuthenticatedPhoneNumber?: boolean;

  _isSocialSecurityNumberAlreadyAssigned?: boolean;
  _isSocialSecurityNumberBanned?: boolean;
  accountType?: DraftAccountType;
  birthCountry?: string;
  citizenshipCountry?: string;
  companyTickerSymbols?: CompanyTickerSymbol[];
  compliances?: {
    // Are you or anyone in your immediate compliances, or, for any non-natural person, any officers, directors, or any person that owns or controls 5% (or greater) of the equity, associated with a FINRA member, organization, or the SEC.
    isAssociatedWithFinra?: boolean;
    // Are you or anyone in your compliances or immediate family, or, for any non-natural person, any of its directors, trustees, 10% (or more) equity holder, an officer, or member of the board of directors of a publicly traded company?
    isAssociatedWithPubliclyTradedCompany?: boolean;
    // Are you or any of your immediate family a senior political figure?
    isSeniorPoliticalFigure?: boolean;
  };
  dateOfBirth?: Date;
  employmentDetails?: EmploymentDetails;
  employmentStatus?: EmploymentStatus;

  experience?: Experience;
  finraInstitution?: string;
  firstName?: string;
  identificationDocument?: IdentificationDocuments;
  isAccreditedInvestor?: boolean;
  isAuthorizedSignatoryEntity?: boolean;
  lastName?: string;
  middleName?: string;
  netIncome?: string;
  netWorth?: string;
  phoneNumber?: string;
  phoneNumberAuthenticationCode?: string;
  profilePicture?: string | undefined;
  residency?: DomicileType;
  ssn?: string;
  visaType?: VisaType;
}

interface EmploymentDetails {
  employerName: string;
  industry: Industry;
  occupation: string;
}

export interface CompanyTickerSymbol {
  symbol: string;
}

export type IdentificationDocuments = string[];
