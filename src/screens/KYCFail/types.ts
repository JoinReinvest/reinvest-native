import { AccountType, Address, VerificationAction } from 'reinvest-app-common/src/types/graphql';

import { Applicant, IdentificationDocuments } from '../Onboarding/types';

export interface KYCFailedFormFields {
  _actions: VerificationAction[] | null;
  accountId: string;
  accountType: AccountType | null;
  address: Address | null;
  dateOfBirth?: string;
  identificationDocument?: IdentificationDocuments;
  name?: {
    firstName?: string;
    lastName?: string;
    middleName?: string;
  };
  ssn?: string;
  stakeholders?: Applicant[];
}
