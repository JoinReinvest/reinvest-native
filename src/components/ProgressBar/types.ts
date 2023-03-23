import {ThemeValues} from '@src/constants/theme';
import {StyleProp, ViewStyle} from 'react-native';

export interface ProgressBarProps {
  value: number;
  style?: StyleProp<ViewStyle>;
  barStyle?: StyleProp<ViewStyle>;
  absolute?: boolean;
  color?: ThemeValues;
  max?: number;
}
