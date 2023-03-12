export type SignUpStackParamsList = {
  BlackForm: undefined;
  FirstStepLogOut: undefined;
};

export interface RegisterFormFields {
  authenticationCode: string;
  email: string;
  password: string;
  referralCode?: string;
}
