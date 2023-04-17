import { PartialMimeTypeKeys } from 'reinvest-app-common/src/constants/mime-types';
import { RESIDENCY_STATUS_LABELS } from 'reinvest-app-common/src/constants/residenty-status';
import { formValidationRules, generateFileSchema } from 'reinvest-app-common/src/form-schemas';
import { z } from 'zod';

import { dateOlderThanEighteenYearsSchema } from '../../utils/formValidationRules';

export const ACCEPTED_FILES_MIME_TYPES: PartialMimeTypeKeys = ['pdf', 'png', 'jpeg'];
export const FILE_SIZE_LIMIT_IN_MEGABYTES = 5;

export const APPLICANT_WITHOUT_IDENTIFICATION = z.object({
  firstName: formValidationRules.firstName,
  middleName: formValidationRules.middleName,
  lastName: formValidationRules.lastName,
  residentialAddress: z.string().min(1),
  socialSecurityNumber: z.string().min(1),
  dateOfBirth: dateOlderThanEighteenYearsSchema,
  domicile: z.enum(RESIDENCY_STATUS_LABELS),
});

export const APPLICANT_IDENTIFICATION = z.object({
  identificationDocument: generateFileSchema(ACCEPTED_FILES_MIME_TYPES, FILE_SIZE_LIMIT_IN_MEGABYTES),
});
