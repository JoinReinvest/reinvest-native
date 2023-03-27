import {AccountTypeValue} from '@constants/account-types';

export interface OnboardingFormFields {
  _hasAuthenticatedPhoneNumber?: boolean;

  accountType?: AccountTypeValue;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phoneNumber?: string;
  phoneNumberAuthenticationCode?: string;
}
