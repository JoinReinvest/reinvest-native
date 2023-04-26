import { Icons } from '../components/Icon/types';

export enum NavigationIdentifiers {
  ADD_BENEFICIARY = 'ADD_BENEFICIARY',
  ADD_ACCOUNT = 'ADD_ACCOUNT',
  INVITE = 'INVITE',
  HELP = 'HELP',
  SIGN_OUT = 'SIGN_OUT',
}

interface Link {
  identifier: NavigationIdentifiers;
  label: string;
  startIcon: Icons;
  showChevron?: boolean;
}

export const SETTINGS_NAVIGATION_LINKS: Link[] = [
  {
    identifier: NavigationIdentifiers.ADD_BENEFICIARY,
    startIcon: 'addBeneficiary',
    label: 'Add Beneficiary',
  },
  {
    identifier: NavigationIdentifiers.ADD_ACCOUNT,
    startIcon: 'addUser',
    label: 'Add Another Account',
  },
  {
    identifier: NavigationIdentifiers.INVITE,
    startIcon: 'friendsAndFamily',
    label: 'Invite Friends & Family',
  },
  {
    identifier: NavigationIdentifiers.HELP,
    startIcon: 'helpAndSupport',
    label: 'Help & Support',
  },
  {
    identifier: NavigationIdentifiers.SIGN_OUT,
    startIcon: 'signOut',
    label: 'Sign Out',
    showChevron: false,
  },
];
