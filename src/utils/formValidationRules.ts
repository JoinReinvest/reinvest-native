import zod from 'zod';
import {formValidationRules as commonFormValidationRules} from 'reinvest-app-common/src/form-schemas';

const requiredError = 'This field is required';
const maskedCodeRegex = /^([0-9]){3}-([0-9]){3}$/;

export const formValidationRules = {
  ...commonFormValidationRules,
  referralCode: zod
    .string()
    .regex(maskedCodeRegex, {message: 'Invalid referral code'}),
  authenticationCode: zod
    .string({required_error: requiredError})
    .regex(maskedCodeRegex, {message: 'Invalid authentication code'}),
  resetPasswordCode: zod
    .string({required_error: requiredError})
    .regex(maskedCodeRegex, {message: 'Invalid reset password code'}),
};
