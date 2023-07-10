import { AccountType } from 'reinvest-app-common/src/types/graphql';

import { Link } from '../../types/link';

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
  PROFILE_NAME = 'PROFILE_NAME',
  BENEFICIARY_NAME = 'BENEFICIARY_NAME',
  PROFILE_PICTURE = 'PROFILE_PICTURE',
  PROFILE_ADDRESS = 'PROFILE_ADDRESS',
  COMPANY_ADDRESS = 'COMPANY_ADDRESS',
  REMOVE_BENEFICIARY = 'REMOVE_BENEFICIARY',
  REMOVE_PROFILE = 'REMOVE_PROFILE',
  COMPANY_DOCUMENTS = 'COMPANY_DOCUMENTS',
  DOMICILE = 'DOMICILE',
  EXPERIENCE_LEVEL = 'EXPERIENCE_LEVEL',
  EMPLOYMENT_DETAILS = 'EMPLOYMENT_DETAILS',
  NET_INCOME_AND_WORTH = 'NET_INCOME_AND_WORTH',
  COMPLIANCES = 'COMPLIANCES',
}

const LINKS: { [key in NavigationIdentifiers]: Link } = {
  INVESTMENT_HISTORY: {
    identifier: NavigationIdentifiers.INVESTMENT_HISTORY,
    label: 'Investment History',
  },
  RECURRING_INVESTMENT: {
    identifier: NavigationIdentifiers.RECURRING_INVESTMENT,
    label: 'Recurring Investment',
  },
  DIVIDEND_REINVESTING: {
    identifier: NavigationIdentifiers.DIVIDEND_REINVESTING,
    label: 'Automatic Dividend Reinvesting',
    title: 'Investing',
    cancellable: true,
  },
  WITHDRAW_FUNDS: {
    identifier: NavigationIdentifiers.WITHDRAW_FUNDS,
    label: 'Withdraw Funds',
    cancellable: true,
    headerShown: false,
  },
  BANK_ACCOUNT: {
    identifier: NavigationIdentifiers.BANK_ACCOUNT,
    label: 'Bank Account',
  },
  ACCOUNT_ACTIVITY: {
    identifier: NavigationIdentifiers.ACCOUNT_ACTIVITY,
    label: 'Account Activity',
  },
  EMAIL_ADDRESS: {
    identifier: NavigationIdentifiers.EMAIL_ADDRESS,
    label: 'Email Address',
    cancellable: true,
    headerShown: false,
  },
  PHONE_NUMBER: {
    identifier: NavigationIdentifiers.PHONE_NUMBER,
    label: 'Phone Number',
    headerShown: false,
  },
  CHANGE_PASSWORD: {
    identifier: NavigationIdentifiers.CHANGE_PASSWORD,
    label: 'Change Password',
    headerShown: false,
  },
  PROFILE_NAME: {
    identifier: NavigationIdentifiers.PROFILE_NAME,
    label: 'Name',
    title: 'Edit Name',
    headerShown: false,
  },
  BENEFICIARY_NAME: {
    identifier: NavigationIdentifiers.BENEFICIARY_NAME,
    label: 'Name',
    title: 'Edit Name',
    cancellable: true,
  },
  PROFILE_PICTURE: {
    identifier: NavigationIdentifiers.PROFILE_PICTURE,
    label: 'Profile Picture',
  },
  PROFILE_ADDRESS: {
    identifier: NavigationIdentifiers.PROFILE_ADDRESS,
    label: 'Residential Address',
    headerShown: false,
    cancellable: true,
  },
  COMPANY_ADDRESS: {
    identifier: NavigationIdentifiers.COMPANY_ADDRESS,
    label: 'Company Address',
    headerShown: false,
    cancellable: true,
  },
  REMOVE_BENEFICIARY: { identifier: NavigationIdentifiers.REMOVE_BENEFICIARY, cancellable: true, label: 'Remove Account' },
  REMOVE_PROFILE: { identifier: NavigationIdentifiers.REMOVE_PROFILE, cancellable: true, label: 'Remove Profile' },
  COMPANY_DOCUMENTS: {
    identifier: NavigationIdentifiers.COMPANY_DOCUMENTS,
    label: 'Documents',
  },
  DOMICILE: { identifier: NavigationIdentifiers.DOMICILE, label: 'Domicile', headerShown: false },
  EXPERIENCE_LEVEL: { identifier: NavigationIdentifiers.EXPERIENCE_LEVEL, label: 'Investor Experience Level', headerShown: false },
  COMPLIANCES: {
    identifier: NavigationIdentifiers.COMPLIANCES,
    label: 'Compliances',
    headerShown: false,
  },
  EMPLOYMENT_DETAILS: { identifier: NavigationIdentifiers.EMPLOYMENT_DETAILS, label: 'Employment Details', headerShown: false },
  NET_INCOME_AND_WORTH: {
    identifier: NavigationIdentifiers.NET_INCOME_AND_WORTH,
    label: 'Net Income And Worth',
    headerShown: false,
  },
};

export const BASE_INVESTING_LINKS: Link[] = [
  LINKS.INVESTMENT_HISTORY,
  LINKS.RECURRING_INVESTMENT,
  LINKS.DIVIDEND_REINVESTING,
  LINKS.WITHDRAW_FUNDS,
  LINKS.BANK_ACCOUNT,
  LINKS.ACCOUNT_ACTIVITY,
];

export const SECURITY_LINKS: Link[] = [LINKS.EMAIL_ADDRESS, LINKS.PHONE_NUMBER, LINKS.CHANGE_PASSWORD];

const PROFILE_INFO_LINKS: Link[] = [
  LINKS.PROFILE_NAME,
  LINKS.PROFILE_ADDRESS,
  LINKS.DOMICILE,
  LINKS.EXPERIENCE_LEVEL,
  LINKS.COMPLIANCES,
  LINKS.PROFILE_PICTURE,
  LINKS.REMOVE_PROFILE,
];

const INDIVIDUAL_INFO_LINKS: Link[] = [...PROFILE_INFO_LINKS, LINKS.EMPLOYMENT_DETAILS, LINKS.NET_INCOME_AND_WORTH];

const CORPORATE_PROFILE_INFO_LINKS: Link[] = [...PROFILE_INFO_LINKS, LINKS.COMPANY_ADDRESS, LINKS.COMPANY_DOCUMENTS];

const BENEFICIARY_PROFILE_INFO_LINKS: Link[] = [LINKS.BENEFICIARY_NAME, LINKS.PROFILE_PICTURE];

export const MANAGE_ACCOUNT_LINKS: { [key in AccountType]: { investing: Link[]; profile: Link[]; security: Link[] } } = {
  [AccountType.Individual]: {
    investing: BASE_INVESTING_LINKS,
    security: SECURITY_LINKS,
    profile: INDIVIDUAL_INFO_LINKS,
  },
  [AccountType.Corporate]: {
    investing: BASE_INVESTING_LINKS,
    security: SECURITY_LINKS,
    profile: CORPORATE_PROFILE_INFO_LINKS,
  },
  [AccountType.Trust]: {
    investing: BASE_INVESTING_LINKS,
    security: SECURITY_LINKS,
    profile: CORPORATE_PROFILE_INFO_LINKS,
  },
  [AccountType.Beneficiary]: {
    investing: [...BASE_INVESTING_LINKS, LINKS.REMOVE_BENEFICIARY],
    security: [],
    profile: BENEFICIARY_PROFILE_INFO_LINKS,
  },
};
