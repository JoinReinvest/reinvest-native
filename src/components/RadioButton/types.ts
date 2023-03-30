import { StyleProp, ViewStyle } from 'react-native';

export interface RadioButtonProps {
  checked: boolean;
  onPress: (selectedId: string) => void;
  value: string;
  labelStyles?: StyleProp<ViewStyle>;
  radioStyles?: StyleProp<ViewStyle>;
}
