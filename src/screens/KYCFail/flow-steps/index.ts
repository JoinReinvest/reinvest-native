import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { KYCFailedFormFields } from '../types';
import { StepIdentificationDocuments } from './/stepIdentificationDocuments';
import { StepPermanentAddress } from './stepPermanentAddress';
import { StepProfileInformation } from './stepProfileInformation';
import { StepProfileManualReview } from './stepProfileManualReview';
import { StepProfileVerificationFailed } from './stepProfileVerificationFailed';
import { StepReverify } from './stepReverify';
import { StepStakeholderList } from './stepStakeholderList';
import { StepStakeholderManualReview } from './stepStakeholdersManualReview';
import { StepStakeholdersVerificationFailed } from './stepStakeholdersVerificationFailed';
import { StepTrusteesVerificationFailed } from './stepTrusteesVerificationFailed';

export const FLOW_STEPS = [
  // PROFILE KYC FAILED FLOW
  StepProfileVerificationFailed,
  StepProfileInformation,
  StepPermanentAddress,
  StepIdentificationDocuments,
  StepProfileManualReview,

  // STAKEHOLDERS KYC FAILED FLOW
  StepTrusteesVerificationFailed,
  StepStakeholdersVerificationFailed,
  StepStakeholderList,
  StepStakeholderManualReview,

  // RUN REVERIFICATION
  StepReverify,
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
