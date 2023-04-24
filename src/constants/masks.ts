export const PHONE_MASK = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
export const REFERRAL_CODE_MASK = [/[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, '-', /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/];
/*
 For obfuscated values we need to allow those additional values for characters
*/
export const SSN_MASK = [/\d | */, /\d | */, /\d | */, '-', /\d | */, /\d | */, '-', /\d/, /\d/, /\d/, /\d/];
export const EIN_MASK = [/\d | */, /\d | */, '-', /\d | */, /\d | */, /\d | */, /\d | */, /\d | */, /\d | */, /\d | */];
