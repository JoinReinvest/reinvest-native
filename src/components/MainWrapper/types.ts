import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface MainWrapperProps {
  contentContainerStyle?: StyleProp<ViewStyle>;
  dark?: boolean;
  gradientColors?: string[];
  isKeyboardAware?: boolean;
  isLoading?: boolean;
  isScroll?: boolean;
  noPadding?: boolean;
  noScrollableContent?: (style: ViewStyle) => ReactNode;
  style?: StyleProp<ViewStyle>;
}
