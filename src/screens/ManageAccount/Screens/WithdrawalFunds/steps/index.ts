import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { WithdrawalFundsFormFields } from '../form-fields';
import { StepPenalties } from './stepPenalties';
import { StepReason } from './stepReason';
import { StepRequestWithdrawal } from './stepRequestWithdrawal';
import { StepWithdrawalAgreement } from './stepWithdrawalAgreement';

export const FLOW_STEPS = [StepRequestWithdrawal, StepPenalties, StepReason, StepWithdrawalAgreement];

const [useWithdrawalFundsFlow, WithdrawalFundsFlowProvider] = createFormFlow<WithdrawalFundsFormFields>({
  steps: FLOW_STEPS,
});

export { useWithdrawalFundsFlow, WithdrawalFundsFlowProvider };
