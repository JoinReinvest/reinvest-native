import { InputProps } from '@components/Input/types';
import { DropdownProps } from '@src/components/Dropdown/types';
import { ControllerProps as ControllerPropsBase } from 'react-hook-form';

export interface ControllerProps extends Partial<Omit<ControllerPropsBase, 'control'>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  fieldName: string;
  onSubmit: () => Promise<void> | void;
  dropdownProps?: Partial<DropdownProps>;
  inputProps?: Partial<InputProps>;
  select?: boolean;
  type?: 'input' | 'textarea';
}
