import {InputProps} from '@components/Input/types';
import {StyleProp, ViewStyle} from 'react-native';
import {
  SelectOptions,
  SelectOption,
} from 'reinvest-app-common/src/types/select-option';

export interface DropdownProps extends Omit<InputProps, 'inputRef'> {
  prefix?: string;
  data?: SelectOptions;
  style?: StyleProp<ViewStyle>;
  onSelect?: (selectedOption: SelectOption) => void;
}
