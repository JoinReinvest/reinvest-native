import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { BeneficiaryCreationFormFields } from '../form-fields';
import { StepConfirmation } from './stepConfirmation';
import { StepFullName } from './stepFullName';
import { StepProfilePicture } from './stepProfilePicture';

export const FLOW_STEPS = [StepFullName, StepProfilePicture, StepConfirmation];

const [useBeneficiaryCreationFlow, BeneficiaryCreationFlowProvider] = createFormFlow<BeneficiaryCreationFormFields>({
  steps: FLOW_STEPS,
});

export { BeneficiaryCreationFlowProvider, useBeneficiaryCreationFlow };
