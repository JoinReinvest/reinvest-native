import type { TouchableOpacityProps } from 'react-native';
import { AccountType } from 'reinvest-app-common/src/types/graphql';

export type AvatarSize = 'xl' | 'l' | 'm' | 's';

export interface AvatarProps extends Pick<TouchableOpacityProps, 'onPress'> {
  username: string;
  isEditable?: boolean;
  onImageSelect?: (uri: string | undefined) => void;
  size?: AvatarSize;
  uri?: string;
  variant?: AccountType;
}
