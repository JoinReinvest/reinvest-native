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
}

export const MANAGE_ACCOUNT_INVESTING: Link[] = [
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
  {
    identifier: NavigationIdentifiers.ADDRESS,
    label: 'Address',
  },
];
