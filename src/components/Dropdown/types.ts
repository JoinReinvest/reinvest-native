import {InputProps} from '@components/Input/types';

export interface DropdownOption {
  key: string | number;
  label: string;
}

export interface DropdownProps extends Omit<InputProps, 'value' | 'inputRef'> {
  data: DropdownOption[];
  onSelect: (selectedOption: DropdownOption) => void;
}
