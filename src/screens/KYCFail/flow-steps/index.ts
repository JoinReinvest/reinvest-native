import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { KYCFailedFormFields } from '../types';
import { StepProfileInformation } from './stepProfileInformation';
import { StepVerificationFailed } from './stepVerificationFailed';

export const FLOW_STEPS = [StepVerificationFailed, StepProfileInformation];

export const initialKYCFailedFormFields: Omit<KYCFailedFormFields, 'accountId'> = {
  _actions: null,
};

const [useKYCFailedFlow, KYCFailedFormFlowProvider] = createFormFlow<KYCFailedFormFields>({
  steps: FLOW_STEPS,
});

export { KYCFailedFormFlowProvider, useKYCFailedFlow };
