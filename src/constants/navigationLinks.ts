import { Link } from '../types/link';

export enum NavigationIdentifiers {
  INVESTMENT_HISTORY = 'INVESTMENT_HISTORY',
  RECURRING_INVESTMENT = 'RECURRING_INVESTMENT',
  DIVIDEND_REINVESTING = 'DIVIDEND_REINVESTING',
  WITHDRAW_FUNDS = 'WITHDRAW_FUNDS',
  BANK_ACCOUNT = 'BANK_ACCOUNT',
  ACCOUNT_ACTIVITY = 'ACCOUNT_ACTIVITY',
  EMAIL_ADDRESS = 'EMAIL_ADDRESS',
  PHONE_NUMBER = 'PHONE_NUMBER',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  NAME = 'NAME',
  PROFILE_PICTURE = 'PROFILE_PICTURE',
  ADDRESS = 'ADDRESS',
  REMOVE_BENEFICIARY = 'REMOVE_BENEFICIARY',
}

export const BASE_MANAGE_ACCOUNT_INVESTING: Link[] = [
  {
    identifier: NavigationIdentifiers.INVESTMENT_HISTORY,
    label: 'Investment History',
  },
  {
    identifier: NavigationIdentifiers.RECURRING_INVESTMENT,
    label: 'Recurring Investment',
  },
  {
    identifier: NavigationIdentifiers.DIVIDEND_REINVESTING,
    label: 'Automatic Dividend Reinvesting',
    title: 'Investing',
    cancellable: true,
  },
  {
    identifier: NavigationIdentifiers.WITHDRAW_FUNDS,
    label: 'Withdraw Funds',
  },
  {
    identifier: NavigationIdentifiers.BANK_ACCOUNT,
    label: 'Bank Account',
  },
  {
    identifier: NavigationIdentifiers.ACCOUNT_ACTIVITY,
    label: 'Account Activity',
  },
];

export const BASE_MANAGE_ACCOUNT_PROFILE_INFO: Link[] = [
  {
    identifier: NavigationIdentifiers.NAME,
    label: 'Name',
  },
  {
    identifier: NavigationIdentifiers.PROFILE_PICTURE,
    label: 'Profile Picture',
  },
];

export const MANAGE_ACCOUNT_BENEFICIARY_INVESTING: Link[] = [
  ...BASE_MANAGE_ACCOUNT_INVESTING,
  {
    identifier: NavigationIdentifiers.REMOVE_BENEFICIARY,
    label: 'Remove Account',
  },
];

export const MANAGE_ACCOUNT_SIGN_IN_AND_SECURITY: Link[] = [
  {
    identifier: NavigationIdentifiers.EMAIL_ADDRESS,
    label: 'Email Address',
    cancellable: true,
    headerShown: false,
  },
  {
    identifier: NavigationIdentifiers.PHONE_NUMBER,
    label: 'Phone Number',
  },
  {
    identifier: NavigationIdentifiers.CHANGE_PASSWORD,
    label: 'Change Password',
    headerShown: false,
  },
];

export const MANAGE_ACCOUNT_PROFILE_INFO: Link[] = [
  {
    identifier: NavigationIdentifiers.NAME,
    label: 'Name',
    title: 'Edit Name',
    headerShown: false,
  },
  {
    identifier: NavigationIdentifiers.PROFILE_PICTURE,
    label: 'Profile Picture',
  },
];

export const MANAGE_ACCOUNT_PROFILE_INFO_WITH_ADDRESS: Link[] = [
  ...BASE_MANAGE_ACCOUNT_PROFILE_INFO,
  {
    identifier: NavigationIdentifiers.ADDRESS,
    label: 'Address',
    headerShown: false,
    cancellable: true,
  },
];
