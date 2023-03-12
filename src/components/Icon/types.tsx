import {SvgProps} from 'react-native-svg';
import {icons} from './constants';
import {type ThemeValues} from '@constants/theme';

export type Icons = keyof typeof icons;

export const iconsNames = Object.keys(icons) as Icons[];

export interface IconProps extends SvgProps {
  icon: Icons;
  color?: ThemeValues;
  size?: 'm' | 'l' | 'xl';
  onPress?: () => void;
}
