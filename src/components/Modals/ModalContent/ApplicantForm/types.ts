import { ApplicantFormFields } from './../../../../screens/Onboarding/utilities';

export interface ApplicantFormStepProps {
  isVisible: boolean;
  onContinue: (fields: Partial<ApplicantFormFields>) => void;
  defaultValues?: ApplicantFormFields;
}

export interface ApplicantAddressFormProps extends ApplicantFormStepProps {
  isSearchDialogOpen: boolean;
  onSearchIconPress: () => void;
}
