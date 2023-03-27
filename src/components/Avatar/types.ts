import { PressableProps } from 'react-native/types';

export type AvatarSize = 'xl' | 'l' | 'm' | 's';
export type AvatarVariant = 'individual' | 'corporate' | 'trust' | 'beneficiary';

export interface AvatarProps extends Pick<PressableProps, 'onPress'> {
  username: string;
  variant: AvatarVariant;
  isEditable?: boolean;
  size?: AvatarSize;
}
