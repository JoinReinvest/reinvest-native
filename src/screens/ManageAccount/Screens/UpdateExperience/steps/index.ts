import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { UpdateExperienceFormFields } from '../form-fields';
import { StepOriginalExperience } from './stepOriginalExperience';
import { StepUpdateExperience } from './stepUpdateExperience';

export const FLOW_STEPS = [StepOriginalExperience, StepUpdateExperience];

const [useUpdateExperienceFlow, UpdateExperienceFlowProvider] = createFormFlow<UpdateExperienceFormFields>({
  steps: FLOW_STEPS,
});

export { UpdateExperienceFlowProvider, useUpdateExperienceFlow };
