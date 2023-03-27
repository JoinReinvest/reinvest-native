import { ThemeValues } from '@src/constants/theme';
import { StyleProp, ViewStyle } from 'react-native';

export interface ProgressBarProps {
  value: number;
  absolute?: boolean;
  barStyle?: StyleProp<ViewStyle>;
  color?: ThemeValues;
  max?: number;
  style?: StyleProp<ViewStyle>;
}
