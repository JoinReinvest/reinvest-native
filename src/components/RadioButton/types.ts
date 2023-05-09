import { StyleProp, ViewStyle } from 'react-native';

export interface RadioButtonProps<T = string> {
  checked: boolean;
  onPress: (selectedId: T) => void;
  value: T;
  labelStyles?: StyleProp<ViewStyle>;
  radioStyles?: StyleProp<ViewStyle>;
}
