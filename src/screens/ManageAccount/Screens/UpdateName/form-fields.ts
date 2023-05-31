import { IdentificationDocuments } from '../../../Onboarding/types';

export interface UpdateNameFormFields {
  firstName?: string;
  identificationDocument?: IdentificationDocuments;
  lastName?: string;
  middleName?: string;
}
