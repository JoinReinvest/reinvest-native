import { InputProps } from '@components/Input/types';
import { type ControllerProps as ControllerPropsBase } from 'react-hook-form';

export interface ControllerProps extends Partial<ControllerPropsBase> {
  control: any;
  fieldName: string;
  onSubmit: () => Promise<void> | void;
  inputProps?: Partial<InputProps>;
  type?: 'input' | 'textarea';
}
