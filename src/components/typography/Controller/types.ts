import { ControllerProps as ControllerPropsBase } from 'react-hook-form';

import { DropdownProps } from '../../Dropdown/types';
import { InputProps } from '../../Input/types';

export interface ControllerProps extends Partial<ControllerPropsBase> {
  control: any;
  fieldName: string;
  onSubmit: () => Promise<void> | void;
  dropdownProps?: Partial<DropdownProps>;
  inputProps?: Partial<InputProps>;
  select?: boolean;
  type?: 'input' | 'textarea';
}
