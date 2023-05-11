import { Address, VerificationAction } from 'reinvest-app-common/src/types/graphql';

import { IdentificationDocuments } from '../Onboarding/types';

export interface KYCFailedFormFields {
  _actions: VerificationAction[] | null;
  accountId: string;
  address?: Address;
  dateOfBirth?: string;
  identificationDocument?: IdentificationDocuments;
  name?: {
    firstName?: string;
    lastName?: string;
    middleName?: string;
  };
  ssn?: string;
}
