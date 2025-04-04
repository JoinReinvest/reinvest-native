import type { TouchableOpacityProps } from 'react-native';
import { AccountType, DraftAccountType } from 'reinvest-app-common/src/types/graphql';

export type AvatarSize = '2xl' | 'xl' | 'l' | 'm' | 's';

export interface AvatarProps extends Pick<TouchableOpacityProps, 'onPress'> {
  initials: string;
  isEditable?: boolean;
  isLoading?: boolean;
  onImageSelect?: (uri: string | undefined) => void;
  size?: AvatarSize;
  uri?: string;
  variant?: AccountType | DraftAccountType | 'NEW_BENEFICIARY';
}
