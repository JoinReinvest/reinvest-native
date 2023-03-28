import { type ThemeValues } from '@constants/theme';
import { SvgProps } from 'react-native-svg';

import { icons } from './constants';

export type Icons = keyof typeof icons;

export interface IconProps extends SvgProps {
  icon: Icons;
  color?: ThemeValues;
  onPress?: () => void;
  size?: 'm' | 'l' | 'xl';
}
