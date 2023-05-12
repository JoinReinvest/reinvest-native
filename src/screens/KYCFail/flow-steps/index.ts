import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { KYCFailedFormFields } from '../types';
import { StepIdentificationDocuments } from './/stepIdentificationDocuments';
import { StepManualReview } from './stepManualReview';
import { StepPermanentAddress } from './stepPermanentAddress';
import { StepProfileInformation } from './stepProfileInformation';
import { StepProfileVerificationFailed } from './stepProfileVerificationFailed';
import { StepStakeholderList } from './stepStakeholderList';
import { StepStakeholdersVerificationFailed } from './stepStakeholdersVerificationFailed';
import { StepTrusteesVerificationFailed } from './stepTrusteesVerificationFailed';

export const FLOW_STEPS = [
  StepTrusteesVerificationFailed,
  StepStakeholdersVerificationFailed,
  StepStakeholderList,
  StepProfileVerificationFailed,
  StepProfileInformation,
  StepPermanentAddress,
  StepIdentificationDocuments,
  StepManualReview,
];

export const initialKYCFailedFormFields: Omit<KYCFailedFormFields, 'accountId'> = {
  _actions: null,
  accountType: null,
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
