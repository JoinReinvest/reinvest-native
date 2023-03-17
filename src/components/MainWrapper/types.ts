import type {ReactNode} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';

export interface MainWrapperProps {
  isLoading?: boolean;
  isScroll?: boolean;
  gradientColors?: string[];
  noScrollableContent?: (style: ViewStyle) => ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  dark?: boolean;
  style?: StyleProp<ViewStyle>;
  isKeyboardAware?: boolean;
}
