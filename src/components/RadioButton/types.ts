import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface RadioButtonProps<T = unknown> {
  checked: boolean;
  value: T;
  bold?: boolean;
  dark?: boolean;
  labelStyles?: StyleProp<TextStyle>;
  onPress?: (selectedId: T) => void;
  radioStyles?: StyleProp<ViewStyle>;
}
