import { StyleProp, ViewStyle } from 'react-native';

import { Theme } from '../../constants/theme';

export type FlexJustify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
export interface Props {
  dark?: boolean;
  fillColor?: Theme;
  justifyContent?: FlexJustify;
  style?: StyleProp<ViewStyle>;
  title?: string;
  variant?: 'success' | 'error' | 'alert';
}
