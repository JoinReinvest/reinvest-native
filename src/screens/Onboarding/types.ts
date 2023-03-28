import { AccountTypeValue } from '@constants/account-types';

export type VisaType = 'F-1' | 'H-1B' | 'L-1' | 'O-1' | 'G-4';

export interface OnboardingFormFields {
  residency: 'us' | 'green-card' | 'visa' | undefined;

  _hasAuthenticatedPhoneNumber?: boolean;
  accountType?: AccountTypeValue;
  birthCountry?: string;
  citizenshipCountry?: string;
  dateOfBirth?: Date;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  phoneNumber?: string;
  phoneNumberAuthenticationCode?: string;
  visaType?: VisaType;
  compliances?: {
    // Are you or anyone in your immediate compliances, or, for any non-natural person, any officers, directors, or any person that owns or controls 5% (or greater) of the equity, associated with a FINRA member, organization, or the SEC.
    isAssociatedWithFinra?: boolean;
    // Are you or anyone in your compliances or immediate family, or, for any non-natural person, any of its directors, trustees, 10% (or more) equity holder, an officer, or member of the board of directors of a publicly traded company?
    isAssociatedWithPubliclyTradedCompany?: boolean;
    // Are you or any of your immediate family a senior political figure?
    isSeniorPoliticalFigure?: boolean;
  };
}
