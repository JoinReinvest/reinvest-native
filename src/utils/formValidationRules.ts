import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { formValidationRules as commonFormValidationRules } from 'reinvest-app-common/src/form-schemas';
import zod from 'zod';

import { STATE_NAMES } from '../constants/states';

const requiredError = 'This field is required';
const phoneWithoutCallingCodeRegex = /^(\d){3}-(\d){3}-(\d{3}|\d{4})$/;
const standardRequiredString = zod.string().trim().min(1, requiredError);

export const MAX_APPLICANTS_COUNT = 5;

export const formValidationRules = {
  ...commonFormValidationRules,
  address: zod.object({
    addressLine1: standardRequiredString,
    addressLine2: zod.string().trim().nullable(),
    city: standardRequiredString,
    state: zod.enum(STATE_NAMES),
    zip: zod
      .string()
      .trim()
      // eslint-disable-next-line security/detect-unsafe-regex
      .regex(/^\d{5}(?:-\d{4})?$/, { message: 'Invalid zip code' }),
  }),
  numberAuthenticationCode: zod.string({ required_error: requiredError }).regex(/^([A-Z0-9]){6}$/i, { message: 'Invalid number authentication code' }),
  date: zod
    .string({ required_error: requiredError })
    .trim()
    .regex(/^(\d{2})\/(\d{2})\/(\d{4})$/, { message: 'Invalid date format' }),
  phone: zod.string({ required_error: requiredError }).trim().regex(phoneWithoutCallingCodeRegex, {
    message: 'Invalid phone number',
  }),
  socialSecurityNumber: zod
    .string()
    .trim()
    .regex(/^((?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4})|(\*{3}-\*{2}-\*{2}(?!0{2})\d{2})$/, { message: 'Invalid Social Security Number' }),
  maskedSocialSecurityNumber: zod
    .string()
    .trim()
    .regex(/^((?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4})|(\*{3}-\*{2}-\d{4})$/, { message: 'Invalid Social Security Number' }),
};

export const MINIMUM_CORPORATION_FILES_COUNT = 1;

export const dateOlderThanEighteenYearsSchema = formValidationRules.date.superRefine((value, context) => {
  dayjs.extend(customParseFormat);
  const dates = {
    today: dayjs(),
    dateOfBirth: dayjs(value, 'MM/DD/YYYY'),
  };

  const dateAgo = dates.today.subtract(18, 'year');
  const isDateOlderThanEighteenYears = dates.dateOfBirth.isBefore(dateAgo);

  if (!isDateOlderThanEighteenYears) {
    context.addIssue({
      code: 'invalid_date',
      message: 'You must be at least 18 years old to use this service.',
    });
  }
});
