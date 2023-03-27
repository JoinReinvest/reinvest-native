import { Theme } from '@constants/theme';
import { ViewStyle } from 'react-native';

const sizes = {
  '2': 2,
  '4': 2,
  '8': 8,
  '12': 12,
  '16': 16,
  '20': 20,
  '24': 24,
  '32': 32,
  '40': 40,
  '48': 48,
  '56': 56,
} as const;

export type SizesEnum = keyof typeof sizes;

export { sizes };

export type PaddingProps = {
  p?: SizesEnum;
  pb?: SizesEnum;
  pl?: SizesEnum;
  pr?: SizesEnum;
  pt?: SizesEnum;
  px?: SizesEnum;
  py?: SizesEnum;
};
export type MarginProps = {
  m?: SizesEnum;
  mb?: SizesEnum;
  ml?: SizesEnum;
  mr?: SizesEnum;
  mt?: SizesEnum;
  mx?: SizesEnum;
  my?: SizesEnum;
};

export type FlexPosition = {
  alignItems?: ViewStyle['alignItems'];
  alignSelf?: ViewStyle['alignSelf'];
  flex?: number;
  flexBasis?: ViewStyle['flexBasis'];
  flexDirection?: ViewStyle['flexDirection'];
  flexGrow?: ViewStyle['flexGrow'];
  flexShrink?: ViewStyle['flexShrink'];
  justifyContent?: ViewStyle['justifyContent'];
};

export type Sizes = { height?: ViewStyle['height']; width?: ViewStyle['width'] };
export type SpacingProps = MarginProps & PaddingProps;

export type BoxProps = {
  color?: Theme;
  fw?: boolean;
  onPress?: () => void;
  radius?: number;
  style?: ViewStyle;
} & SpacingProps &
  FlexPosition &
  Sizes;
