import { FundsWithdrawalAgreement, Usd } from 'reinvest-app-common/src/types/graphql';

export interface WithdrawalFundsFormFields {
  _accountValue?: string;
  agreement?: FundsWithdrawalAgreement;
  eligibleForWithdrawal?: Usd;
  isAgreementAccepted?: boolean;
  penaltiesFee?: Usd;
  reason?: string;
}
