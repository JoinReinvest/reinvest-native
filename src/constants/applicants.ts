import { ApplicantFormFields } from '../screens/Onboarding/utilities';

export const EMPTY_APPLICANT_FORM: ApplicantFormFields = {
  id: undefined,
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
  idScan: [],
  domicile: undefined,
};
