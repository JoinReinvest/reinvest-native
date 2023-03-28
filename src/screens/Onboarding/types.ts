import {AccountTypeValue} from '@constants/account-types';

export type VisaType = 'F-1' | 'H-1B' | 'L-1' | 'O-1' | 'G-4';

export interface OnboardingFormFields {
  _hasAuthenticatedPhoneNumber?: boolean;

  accountType?: AccountTypeValue;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phoneNumber?: string;
  phoneNumberAuthenticationCode?: string;
  residency: 'us' | 'green-card' | 'visa' | undefined;
  birthCountry?: string;
  citizenshipCountry?: string;
  visaType?: VisaType;
}
