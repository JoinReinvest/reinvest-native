import { ApplicantFormFields } from './../../../../screens/Onboarding/utilities';

export interface ApplicantFormStepProps {
  isVisible: boolean;
  onContinue: (fields: Partial<ApplicantFormFields>) => void;
  defaultValues?: ApplicantFormFields;
}

export interface ApplicantAddressFormProps extends ApplicantFormStepProps {
  dismissSearchDialog: () => void;
  isSearchDialogOpen: boolean;
  onSearchIconPress: () => void;
}
