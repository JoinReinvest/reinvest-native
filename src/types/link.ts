import { Icons } from '../components/Icon/types';
import { NavigationIdentifiers } from '../constants/navigationLinks';

export interface Link {
  identifier: NavigationIdentifiers;
  label: string;
  showChevron?: boolean;
  startIcon?: Icons;
}
