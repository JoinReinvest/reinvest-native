import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { UpdatePasswordFormFields } from '../form-fields';
import { StepCurrentPassword } from './stepCurrentPassword';
import { StepNewPassword } from './stepNewPassword';

export const FLOW_STEPS = [StepCurrentPassword, StepNewPassword];

const [useUpdateEmailFlow, UpdateEmailFlowProvider] = createFormFlow<UpdatePasswordFormFields>({
  steps: FLOW_STEPS,
});

export { UpdateEmailFlowProvider, useUpdateEmailFlow };
