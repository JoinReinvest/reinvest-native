import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { UpdatePhoneNumberFormFields } from '../form-fields';
import { StepAuthenticationCode } from './stepAuthenticationCode';
import { StepOriginalPhoneNumber } from './stepOriginalPhoneNumber';
import { StepUpdatePhoneNumber } from './stepUpdatePhoneNumber';

export const FLOW_STEPS = [StepOriginalPhoneNumber, StepUpdatePhoneNumber, StepAuthenticationCode];

const [useUpdatePhoneNumberFlow, UpdatePhoneNumberFlowProvider] = createFormFlow<UpdatePhoneNumberFormFields>({
  steps: FLOW_STEPS,
});

export { UpdatePhoneNumberFlowProvider, useUpdatePhoneNumberFlow };
