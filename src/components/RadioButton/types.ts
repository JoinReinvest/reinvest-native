import { StyleProp, ViewStyle } from 'react-native';

export interface RadioButtonProps {
  checked: boolean;
  id: string;
  onPress: (selectedId: string) => void;
  labelStyles?: StyleProp<ViewStyle>;
  radioStyles?: StyleProp<ViewStyle>;
}
