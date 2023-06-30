import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { UpdateDomicileFormFields } from '../form-fields';
import { StepOriginalDomicile } from './stepsOriginalDomicile';
import { StepUpdateDomicileType } from './stepUpdateDomicileType';
import { StepUpdateDomicileDetails } from './updateDomicileDetails';

export const FLOW_STEPS = [StepOriginalDomicile, StepUpdateDomicileType, StepUpdateDomicileDetails];

const [useUpdateDomicileFlow, UpdateDomicileFlowProvider] = createFormFlow<UpdateDomicileFormFields>({
  steps: FLOW_STEPS,
});

export { UpdateDomicileFlowProvider, useUpdateDomicileFlow };
