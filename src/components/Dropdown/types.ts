import { StyleProp, ViewStyle } from 'react-native';
import { SelectOption, SelectOptions } from 'reinvest-app-common/src/types/select-option';

import { InputProps } from '../Input/types';

export interface DropdownProps extends Omit<InputProps, 'inputRef'> {
  data?: SelectOptions;
  onSelect?: (selectedOption: SelectOption) => void;
  prefix?: string;
  style?: StyleProp<ViewStyle>;
}
