import { Icons } from '../components/Icon/types';
import { NavigationIdentifiers } from '../screens/ManageAccount/navigationLinks';

export interface Link {
  identifier: NavigationIdentifiers;
  /** link's label as well as header for navigation if title prop is not provided */
  label: string;
  /** show cancel button on top right corner and return to dashboard  */
  cancellable?: boolean;
  /** Show default header for given screen */
  headerShown?: boolean;
  /** show right chevron at the right side of link  */
  showChevron?: boolean;
  /** icon on the left of the label */
  startIcon?: Icons;
  /** title for navigation header if not provided label will be used */
  title?: string;
}
