import { InputProps } from '../Input/types';

export interface TextAreaProps extends Omit<InputProps, 'multiline'> {
  numberOfLines?: number;
}
