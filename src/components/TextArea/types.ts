import {InputProps} from '@components/Input/types';

export interface TextAreaProps extends Omit<InputProps, 'multiline'> {
  numberOfLines?: number;
}
