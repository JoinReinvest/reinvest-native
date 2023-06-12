import { StyleProp, ViewProps, ViewStyle } from 'react-native';

import { Theme } from '../../../constants/theme';

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
  pb?: SizesEnum | number;
  pl?: SizesEnum;
  pr?: SizesEnum;
  pt?: SizesEnum;
  px?: SizesEnum | 'default';
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
  position?: ViewStyle['position'];
};

export type Sizes = { height?: ViewStyle['height']; width?: ViewStyle['width'] };
export type SpacingProps = MarginProps & PaddingProps;

export type BoxProps = {
  color?: Theme;
  colorOpacity?: number;
  fh?: boolean;
  fw?: boolean;
  onPress?: () => void;
  radius?: number;
  style?: StyleProp<ViewStyle>;
} & SpacingProps &
  FlexPosition &
  Sizes &
  Partial<ViewProps>;
