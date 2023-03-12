import {type ControllerProps as ControllerPropsBase} from 'react-hook-form';
import {InputProps} from '@components/Input/types';

export interface ControllerProps extends Partial<ControllerPropsBase> {
  fieldName: string;
  control: any;
  onSubmit: () => Promise<void> | void;
  type?: 'input' | 'textarea';
  inputProps?: Partial<InputProps>;
}
