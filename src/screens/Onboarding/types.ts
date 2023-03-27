import { AccountTypeValue } from '@constants/account-types';
export interface OnboardingFormFields {
  accountType?: AccountTypeValue;
  firstName?: string;
  lastName?: string;
  middleName?: string;
}
