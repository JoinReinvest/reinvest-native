import { Icons } from '../components/Icon/types';

interface Link {
  key: string;
  label: string;
  startIcon: Icons;
  showChevron?: boolean;
}

export const SETTINGS_NAVIGATION_LINKS: Link[] = [
  {
    key: 'addBeneficiary',
    startIcon: 'addBeneficiary',
    label: 'Add Beneficiary',
  },
  {
    key: 'addAccount',
    startIcon: 'addUser',
    label: 'Add Another Account',
  },
  {
    key: 'invite',
    startIcon: 'friendsAndFamily',
    label: 'Invite Friends & Family',
  },
  {
    key: 'help',
    startIcon: 'helpAndSupport',
    label: 'Help & Support',
  },
  {
    key: 'signOut',
    startIcon: 'signOut',
    label: 'Sign Out',
    showChevron: false,
  },
];
