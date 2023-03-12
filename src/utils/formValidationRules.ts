import zod from 'zod';

const requiredError = 'This field is required';
const passwordSchema = zod
  .string({required_error: requiredError})
  .min(8, 'At least 8 characters are required')
  .regex(/[a-z]/, {message: 'At least one lowercase letter is required'})
  .regex(/[A-Z]/, {message: 'At least one uppercase letter is required'})
  .regex(/\d/, {message: 'At least one number is required'});

export const formValidationRules = {
  email: zod
    .string({required_error: requiredError})
    .email('Please provide a valid email'),
  password: passwordSchema,
  confirm_password: passwordSchema,
  firstName: zod.string({required_error: requiredError}),
  lastName: zod.string({required_error: requiredError}),
  middleName: zod.string().optional(),
  referralCode: zod
    .string()
    .regex(/^\d{6}$/, {message: 'Invalid referral code'}),
  authenticationCode: zod
    .string()
    .regex(/^\d{6}$/, {message: 'Invalid authentication code'}),
};
