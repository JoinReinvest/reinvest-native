import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { formValidationRules as commonFormValidationRules } from 'reinvest-app-common/src/form-schemas';
import zod from 'zod';

const requiredError = 'This field is required';
const maskedCodeRegex = /^([0-9]){3}-([0-9]){3}$/;
const referralCodeRegex = /^([A-Z0-9]){3}-([A-Z0-9]){3}$/;
const phoneWithoutCallingCodeRegex = /^([0-9]){3}-([0-9]){3}-([0-9]){3}$/;

export const formValidationRules = {
  ...commonFormValidationRules,
  referralCode: zod.string().regex(referralCodeRegex, { message: 'Invalid referral code' }),
  authenticationCode: zod.string({ required_error: requiredError }).regex(maskedCodeRegex, { message: 'Invalid authentication code' }),
  date: zod.string({ required_error: requiredError }).regex(/^(\d{2})\/(\d{2})\/(\d{4})$/, { message: 'Invalid date format' }),
  resetPasswordCode: zod.string({ required_error: requiredError }).regex(maskedCodeRegex, { message: 'Invalid reset password code' }),
  phone: zod.string({ required_error: requiredError }).regex(phoneWithoutCallingCodeRegex, {
    message: 'Invalid phone number',
  }),
};

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
