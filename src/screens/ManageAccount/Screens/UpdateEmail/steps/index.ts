import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { UpdateEmailFormFields } from '../form-fields';
import { StepAuthenticationCode } from './stepAuthenticationCode';
import { StepOriginalEmail } from './stepOriginalEmail';
import { StepUpdateEmail } from './stepUpdateEmail';

export const FLOW_STEPS = [StepOriginalEmail, StepUpdateEmail, StepAuthenticationCode];

const [useUpdateEmailFlow, UpdateEmailFlowProvider] = createFormFlow<UpdateEmailFormFields>({
  steps: FLOW_STEPS,
});

export { UpdateEmailFlowProvider, useUpdateEmailFlow };
