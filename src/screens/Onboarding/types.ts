import {AccountTypeValue} from '@constants/account-types';

export interface OnboardingFormFields {
  accountType?: AccountTypeValue;
  firstName?: string;
  middleName?: string;
  lastName?: string;
}
