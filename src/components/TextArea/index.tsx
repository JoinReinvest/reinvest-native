import React, { forwardRef } from 'react';
import { TextInput } from 'react-native';

import { Input } from '../Input';
import { styles } from './styles';
import { TextAreaProps } from './types';

export const TextArea = forwardRef<TextInput, TextAreaProps>(({ numberOfLines = 6, value = '', inputStyle, style, ...rest }, ref) => {
  return (
    <Input
      value={value}
      multiline
      numberOfLines={numberOfLines}
      style={[styles.inputWrapper, style]}
      inputStyle={[styles.inputStyle, inputStyle]}
      wrapperStyle={[styles.wrapper]}
      ref={ref}
      {...rest}
    />
  );
});
