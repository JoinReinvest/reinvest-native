import {ViewStyle} from 'react-native';
import {Theme} from '@constants/theme';

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

export {sizes};

export type PaddingProps = {
  p?: SizesEnum;
  pt?: SizesEnum;
  pb?: SizesEnum;
  pl?: SizesEnum;
  pr?: SizesEnum;
  px?: SizesEnum;
  py?: SizesEnum;
};
export type MarginProps = {
  m?: SizesEnum;
  mt?: SizesEnum;
  mb?: SizesEnum;
  ml?: SizesEnum;
  mr?: SizesEnum;
  mx?: SizesEnum;
  my?: SizesEnum;
};

export type FlexPosition = {
  flex?: number;
  alignItems?: ViewStyle['alignItems'];
  alignSelf?: ViewStyle['alignSelf'];
  justifyContent?: ViewStyle['justifyContent'];
  flexDirection?: ViewStyle['flexDirection'];
  flexBasis?: ViewStyle['flexBasis'];
  flexShrink?: ViewStyle['flexShrink'];
  flexGrow?: ViewStyle['flexGrow'];
};

export type Sizes = {width?: ViewStyle['width']; height?: ViewStyle['height']};
export type SpacingProps = MarginProps & PaddingProps;

export type BoxProps = {
  style?: ViewStyle;
  color?: Theme;
  radius?: number;
  onPress?: () => void;
  fw?: boolean;
} & SpacingProps &
  FlexPosition &
  Sizes;
