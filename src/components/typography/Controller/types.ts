import {ControllerProps as ControllerPropsBase} from 'react-hook-form';
import {InputProps} from '@components/Input/types';
import {DropdownProps} from '@src/components/Dropdown/types';

export interface ControllerProps extends Partial<ControllerPropsBase> {
  select?: boolean;
  fieldName: string;
  control: any;
  onSubmit: () => Promise<void> | void;
  type?: 'input' | 'textarea';
  inputProps?: Partial<InputProps>;
  dropdownProps?: Partial<DropdownProps>;
}
