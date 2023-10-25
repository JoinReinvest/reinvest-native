import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { KYCFailedFormFields } from '../types';
import { StepIdentificationDocuments } from './/stepIdentificationDocuments';
import { StepManualReview } from './stepManualReview';
import { StepPermanentAddress } from './stepPermanentAddress';
import { StepProfileInformation } from './stepProfileInformation';
import { StepProfileVerificationFailed } from './stepProfileVerificationFailed';
import { StepReverify } from './stepReverify';
import { StepStakeholderList } from './stepStakeholderList';
import { StepStakeholdersVerificationFailed } from './stepStakeholdersVerificationFailed';
import { StepTrusteesVerificationFailed } from './stepTrusteesVerificationFailed';

export const FLOW_STEPS = [
  // PROFILE KYC FAILED FLOW
  StepProfileVerificationFailed,
  StepProfileInformation,
  StepPermanentAddress,
  StepIdentificationDocuments,

  // STAKEHOLDERS KYC FAILED FLOW
  StepTrusteesVerificationFailed,
  StepStakeholdersVerificationFailed,
  StepStakeholderList,

  // RUN REVERIFICATION
  StepReverify,

  // FEES REQUIRED
  StepManualReview,
];

export const initialKYCFailedFormFields: Omit<KYCFailedFormFields, 'accountId'> = {
  _approvedFees: false,
  _bannedAction: undefined,
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
  fees: undefined,
  _forceManualReviewScreen: false,
};

const [useKYCFailedFlow, KYCFailedFormFlowProvider] = createFormFlow<KYCFailedFormFields>({
  steps: FLOW_STEPS,
});

export { KYCFailedFormFlowProvider, useKYCFailedFlow };
