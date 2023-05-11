import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { KYCFailedFormFields } from '../types';
import { StepIdentificationDocuments } from './/stepIdentificationDocuments';
import { StepPermanentAddress } from './stepPermanentAddress';
import { StepProfileInformation } from './stepProfileInformation';
import { StepVerificationFailed } from './stepVerificationFailed';

export const FLOW_STEPS = [StepVerificationFailed, StepProfileInformation, StepPermanentAddress, StepIdentificationDocuments];

export const initialKYCFailedFormFields: Omit<KYCFailedFormFields, 'accountId'> = {
  _actions: null,
  address: null,
  name: {
    firstName: undefined,
    middleName: undefined,
    lastName: undefined,
  },
  ssn: undefined,
  dateOfBirth: undefined,
};

const [useKYCFailedFlow, KYCFailedFormFlowProvider] = createFormFlow<KYCFailedFormFields>({
  steps: FLOW_STEPS,
});

export { KYCFailedFormFlowProvider, useKYCFailedFlow };
