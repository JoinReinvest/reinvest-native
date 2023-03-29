import { AccountTypeValue } from '../../constants/account-types';

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
}
