import { InputProps } from '@components/Input/types';
import { StyleProp, ViewStyle } from 'react-native';
import { SelectOption, SelectOptions } from 'reinvest-app-common/src/types/select-option';

export interface DropdownProps extends Omit<InputProps, 'inputRef'> {
  data?: SelectOptions;
  onSelect?: (selectedOption: SelectOption) => void;
  prefix?: string;
  style?: StyleProp<ViewStyle>;
}
