import { AccountType, Address, PersonName, VerificationAction } from 'reinvest-app-common/src/types/graphql';

import { Applicant, IdentificationDocuments } from '../Onboarding/types';

export interface KYCFailedFormFields {
  _actions: VerificationAction[] | null;
  accountId: string;
  accountType: AccountType | null;
  address: Address | null;
  dateOfBirth?: string;
  identificationDocument?: IdentificationDocuments;
  name?: PersonName;
  ssn?: string;
  stakeholders?: Applicant[];
}
