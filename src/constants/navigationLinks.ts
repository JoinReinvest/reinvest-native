import { AccountType } from 'reinvest-app-common/src/types/graphql';

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
  COMPANY_DOCUMENTS = 'COMPANY_DOCUMENTS',
}

export const BASE_INVESTING_LINKS: Link[] = [
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

export const SECURITY_LINKS: Link[] = [
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

const BASE_PROFILE_INFO_LINKS: Link[] = [
  {
    identifier: NavigationIdentifiers.NAME,
    label: 'Name',
    title: 'Edit Name',
    headerShown: false,
  },
  {
    identifier: NavigationIdentifiers.ADDRESS,
    label: 'Address',
    headerShown: false,
    cancellable: true,
  },
  {
    identifier: NavigationIdentifiers.PROFILE_PICTURE,
    label: 'Profile Picture',
  },
];

const CORPORATE_PROFILE_INFO_LINKS: Link[] = [
  {
    identifier: NavigationIdentifiers.COMPANY_DOCUMENTS,
    label: 'Documents',
  },
  {
    identifier: NavigationIdentifiers.ADDRESS,
    label: 'Address',
    headerShown: false,
    cancellable: true,
  },
  {
    identifier: NavigationIdentifiers.PROFILE_PICTURE,
    label: 'Profile Picture',
  },
];

const BENEFICIARY_PROFILE_INFO_LINKS: Link[] = [
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

export const MANAGE_ACCOUNT_LINKS: { [key in AccountType]: { investing: Link[]; profile: Link[]; security: Link[] } } = {
  [AccountType.Individual]: {
    investing: BASE_INVESTING_LINKS,
    security: SECURITY_LINKS,
    profile: BASE_PROFILE_INFO_LINKS,
  },
  [AccountType.Corporate]: {
    investing: BASE_INVESTING_LINKS,
    security: SECURITY_LINKS,
    profile: BASE_PROFILE_INFO_LINKS,
  },
  [AccountType.Trust]: {
    investing: BASE_INVESTING_LINKS,
    security: SECURITY_LINKS,
    profile: CORPORATE_PROFILE_INFO_LINKS,
  },
  [AccountType.Beneficiary]: {
    investing: BASE_INVESTING_LINKS,
    security: [],
    profile: BENEFICIARY_PROFILE_INFO_LINKS,
  },
};
