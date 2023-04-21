import { ApplicantFormFields } from '../screens/Onboarding/utilities';

export const EMPTY_APPLICANT_FORM: ApplicantFormFields = {
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: '',
  socialSecurityNumber: '',
  residentialAddress: {
    addressLine1: '',
    addressLine2: '',
    state: '',
    city: '',
    zip: '',
    country: 'USA',
  },
  domicile: undefined,
};
