import {InputProps} from '../Input/input.types';

export interface TextAreaProps extends Omit<InputProps, 'multiline'> {
  numberOfLines?: number;
}
