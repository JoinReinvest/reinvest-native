import { SvgProps } from 'react-native-svg';

import { type ThemeValues } from '../../constants/theme';
import { icons } from './constants';

export type Icons = keyof typeof icons;

export const iconsNames = Object.keys(icons) as Icons[];

export interface IconProps extends SvgProps {
  icon: Icons;
  color?: ThemeValues;
  onPress?: () => void;
  size?: 'm' | 'l' | 'xl';
}
