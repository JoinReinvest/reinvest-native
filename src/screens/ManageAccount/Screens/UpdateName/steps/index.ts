import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { UpdateNameFormFields } from '../form-fields';
import { StepIdentificationDocuments } from './stepIdentificationDocuments';
import { StepOriginalName } from './stepOriginalName';
import { StepUpdateName } from './stepUpdateName';

export const FLOW_STEPS = [StepOriginalName, StepUpdateName, StepIdentificationDocuments];

const [useUpdateNameFlow, UpdateNameFlowProvider] = createFormFlow<UpdateNameFormFields>({
  steps: FLOW_STEPS,
});

export { UpdateNameFlowProvider, useUpdateNameFlow };
