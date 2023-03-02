import type {ReactNode} from 'react';
import type {ViewStyle, StyleProp} from 'react-native';

export interface MainWrapperProps {
  isLoading?: boolean;
  isScroll?: boolean;
  gradientColors?: string[];
  noScrollableContent?: (style: ViewStyle) => ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
}
