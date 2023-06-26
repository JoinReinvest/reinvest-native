import { AccountType, Address, PersonName, Usd, VerificationAction } from 'reinvest-app-common/src/types/graphql';

import { Applicant, IdentificationDocuments } from '../Onboarding/types';

export interface KYCFailedFormFields {
  _actions: VerificationAction[] | null;
  accountId: string;
  accountType: AccountType | null;
  address: Address | null;
  _approvedFees?: boolean;
  _bannedAction?: VerificationAction;
  /**
   * _forceManualReviewScreen
   * if user does not have any action that can be automatically updated, but has fees to pay will be set to true
   */
  _forceManualReviewScreen?: boolean;
  _oneTimeInvestmentId?: string;
  _recurringInvestmentId?: string;
  _skipStakeholders?: boolean;
  dateOfBirth?: string;
  fees?: Usd;
  identificationDocument?: IdentificationDocuments;
  name?: PersonName;
  ssn?: string;
  stakeholders?: Applicant[];
}
