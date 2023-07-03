import { StyleProp, ViewStyle } from 'react-native';

export interface RadioButtonProps<T = unknown> {
  checked: boolean;
  value: T;
  dark?: boolean;
  labelStyles?: StyleProp<ViewStyle>;
  onPress?: (selectedId: T) => void;
  radioStyles?: StyleProp<ViewStyle>;
}
