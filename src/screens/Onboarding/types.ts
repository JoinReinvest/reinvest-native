import { DocumentPickerResponse } from 'react-native-document-picker';
import { Asset } from 'react-native-image-picker';
import { CorporationAnnualRevenue, CorporationNumberOfEmployees } from 'reinvest-app-common/src/constants/corporation';
import { Industry } from 'reinvest-app-common/src/constants/industries';
import {
  Address,
  CorporateCompanyType,
  DomicileType,
  DraftAccountType,
  Employer,
  EmploymentStatus,
  Experience,
  SimplifiedDomicileType,
  StatementType,
  TrustCompanyTypeEnum,
} from 'reinvest-app-common/src/types/graphql';

export interface OnboardingFormFields {
  address: Address | null;
  dateOfBirth: string | null;
  isCompletedProfile: boolean;
  residency: DomicileType | null;
  _currentCompanyMajorStakeholder?: IndexedSchema<Applicant>;
  _currentTrustTrusteeGrantorOrProtector?: IndexedSchema<Applicant>;
  _didDocumentIdentificationValidationSucceed?: boolean;
  _hasAuthenticatedPhoneNumber?: boolean;
  _isEditingCompanyMajorStakeholderApplicant?: boolean;
  _isEditingTrustTrusteeGrantorOrProtector?: boolean;
  _isPhoneCompleted?: boolean;
  _isSocialSecurityNumberAlreadyAssigned?: boolean;
  _isSocialSecurityNumberBanned?: boolean;
  _willHaveMajorStakeholderApplicants?: boolean;
  _willHaveTrustTrusteesGrantorsOrProtectors?: boolean;
  accountId?: string;
  accountType?: DraftAccountType;
  authCode?: string;
  authenticationCode?: string;
  birthCountry?: string;

  businessAddress?: Address;
  citizenshipCountry?: string;
  companyMajorStakeholderApplicants?: Applicant[];
  companyTickerSymbols?: CompanyTickerSymbol[];
  compliances?: {
    // Are you or anyone in your immediate compliances, or, for any non-natural person, any officers, directors, or any person that owns or controls 5% (or greater) of the equity, associated with a FINRA member, organization, or the SEC.
    isAssociatedWithFinra?: boolean;
    // Are you or anyone in your compliances or immediate family, or, for any non-natural person, any of its directors, trustees, 10% (or more) equity holder, an officer, or member of the board of directors of a publicly traded company?
    isAssociatedWithPubliclyTradedCompany?: boolean;
    // Are you or any of your immediate family a senior political figure?
    isSeniorPoliticalFigure?: boolean;
  };
  corporationLegalName?: string;
  corporationType?: CorporateCompanyType;
  documentsForCorporation?: Documents;
  documentsForTrust?: Documents;
  domicile?: Domicile;
  ein?: string;
  employer?: Employer;

  employment?: {
    employerName?: string;
    industry?: string;
    occupation?: string;
  };
  employmentStatus?: EmploymentStatus;
  experience?: Experience | null;
  fiduciaryEntityInformation?: FiduciaryEntityInformation;
  finraInstitution?: string;
  finraInstitutionName?: string;
  identificationDocument?: Documents;
  isAccreditedInvestor?: boolean;
  isAuthorizedSignatoryEntity?: boolean;
  name?: {
    firstName: string;
    lastName: string;
    middleName?: string;
  };
  netIncome?: string;
  netWorth?: string;
  permanentAddress?: Address;
  phone?: {
    countryCode?: string;
    number?: string;
  };
  phoneNumberAuthenticationCode?: string;
  profilePicture?: string;
  seniorPoliticalFigure?: string;
  ssn?: string;
  statementTypes?: StatementType[];
  trustLegalName?: string;
  trustTrusteesGrantorsOrProtectors?: Applicant[];
  trustType?: TrustCompanyTypeEnum;
  visaType?: 'F-1' | 'H-1B' | 'L-1' | 'O-1' | 'G-4';
}

export interface CompanyTickerSymbol {
  symbol: string;
}

export type IdentificationDocument = { fileName: string; id: string };

export type AssetWithPreloadedFiles = DocumentPickerResponse | Asset | IdentificationDocument;

export type IdentificationDocuments = string | { fileName: string; id: string }[];

export type Documents = string[] | { fileName: string; id: string }[];

export interface Applicant {
  dateOfBirth?: string | null;
  domicile?: SimplifiedDomicileType;
  firstName?: string;
  identificationDocument?: string;
  lastName?: string;
  middleName?: string;
  residentialAddress?: Address;
  socialSecurityNumber?: string;
}

export type IndexedSchema<Schema> = Schema & {
  _index?: number;
};

export interface Domicile {
  forGreenCard?: {
    birthCountry: string;
    citizenshipCountry: string;
  };
  forVisa?: {
    birthCountry: string;
    citizenshipCountry: string;
    visaType: string;
  };
}

interface FiduciaryEntityInformation {
  annualRevenue?: CorporationAnnualRevenue;
  industry?: Industry;
  numberOfEmployees?: CorporationNumberOfEmployees;
}
