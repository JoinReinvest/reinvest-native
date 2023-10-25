import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { UpdateEmploymentDetailsFormFields } from '../form-fields';
import { StepOriginalEmploymentDetails } from './stepOriginalEmploymentDetails';
import { StepUpdateEmploymentDetails } from './stepUpdateEmploymentDetails';
import { StepUpdateEmploymentStatus } from './stepUpdateEmploymentStatus';

export const FLOW_STEPS = [StepOriginalEmploymentDetails, StepUpdateEmploymentStatus, StepUpdateEmploymentDetails];

const [useUpdateEmploymentDetailsFlow, UpdateEmploymentDetailsFlowProvider] = createFormFlow<UpdateEmploymentDetailsFormFields>({
  steps: FLOW_STEPS,
});

export { UpdateEmploymentDetailsFlowProvider, useUpdateEmploymentDetailsFlow };
