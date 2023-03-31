import type { TouchableOpacityProps } from 'react-native';
import { ACCOUNT_TYPES_VALUES } from 'reinvest-app-common/src/constants/account-types';

export type AvatarSize = 'xl' | 'l' | 'm' | 's';
type AccountTypes = (typeof ACCOUNT_TYPES_VALUES)[number];

export interface AvatarProps extends Pick<TouchableOpacityProps, 'onPress'> {
  username: string;
  isEditable?: boolean;
  onImageSelect?: (uri: string | undefined) => void;
  size?: AvatarSize;
  uri?: string;
  variant?: AccountTypes;
}
