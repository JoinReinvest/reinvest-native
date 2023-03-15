import {StyleProp, ViewStyle} from 'react-native';

export interface RadioButtonProps {
  id: string;
  checked: boolean;
  onPress: (selectedId: string) => void;
  radioStyles?: StyleProp<ViewStyle>;
  labelStyles?: StyleProp<ViewStyle>;
}
