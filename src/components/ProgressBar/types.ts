import { StyleProp, ViewStyle } from 'react-native';

import { ThemeValues } from '../../constants/theme';

export interface ProgressBarProps {
  value: number;
  absolute?: boolean;
  barStyle?: StyleProp<ViewStyle>;
  color?: ThemeValues;
  max?: number;
  style?: StyleProp<ViewStyle>;
}
