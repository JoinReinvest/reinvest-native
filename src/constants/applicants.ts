import { ApplicantFormFields } from '../screens/Onboarding/utilities';

export const EMPTY_APPLICANT_FORM: ApplicantFormFields = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  socialSecurityNumber: '',
  residentialAddress: {
    addressLine1: '',
    addressLine2: '',
    state: '',
    city: '',
    zip: '',
    country: 'US',
  },
  domicile: undefined,
};
