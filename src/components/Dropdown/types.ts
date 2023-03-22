import {InputProps} from '@components/Input/types';
import {StyleProp, ViewStyle} from 'react-native';

export interface DropdownOption {
  key: string | number;
  label: string;
}

export interface DropdownProps extends Omit<InputProps, 'inputRef'> {
  data: DropdownOption[];
  style?: StyleProp<ViewStyle>;
  onSelect: (selectedOption: DropdownOption) => void;
}
