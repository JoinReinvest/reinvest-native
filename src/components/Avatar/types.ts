import type { TouchableOpacityProps } from 'react-native';

export type AvatarSize = 'xl' | 'l' | 'm' | 's';
export type AvatarVariant = 'individual' | 'corporate' | 'trust' | 'beneficiary';

export interface AvatarProps extends Pick<TouchableOpacityProps, 'onPress'> {
  username: string;
  variant: AvatarVariant;
  isEditable?: boolean;
  size?: AvatarSize;
}
