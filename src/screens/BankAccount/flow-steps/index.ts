import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { BankAccountFormFields } from '../types';
import { BankAccountConfirmed } from './bankAccountConfirmed';
import { Plaid } from './plaid';
import { PlaidInformation } from './plaidInformation';

export const FLOW_STEPS = [PlaidInformation, Plaid, BankAccountConfirmed];

export const bankAccountInitialSteps: Omit<BankAccountFormFields, 'accountId'> = {};

const [useBankAccountFlow, BankAccountFlowProvider] = createFormFlow<BankAccountFormFields>({
  steps: FLOW_STEPS,
});

export { BankAccountFlowProvider, useBankAccountFlow };
