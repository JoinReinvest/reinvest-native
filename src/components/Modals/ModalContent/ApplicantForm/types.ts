import { Applicant } from 'screens/Onboarding/types';

import { ApplicantFormFields } from './../../../../screens/Onboarding/utilities';

export interface ApplicantFormStepProps {
  isVisible: boolean;
  onContinue: (fields: Applicant) => void;
  defaultValues?: ApplicantFormFields;
}

export interface ApplicantAddressFormProps extends ApplicantFormStepProps {
  isSearchDialogOpen: boolean;
  onSearchIconPress: () => void;
}
