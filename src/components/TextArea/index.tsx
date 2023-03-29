import React from 'react';

import { isIOS } from '../../constants/common';
import { Input } from '../Input';
import { styles } from './styles';
import { TextAreaProps } from './types';

export const TextArea = ({ numberOfLines = 6, value = '', inputStyle, style, ...rest }: TextAreaProps) => {
  return (
    <Input
      value={value}
      multiline
      numberOfLines={numberOfLines}
      style={[styles.inputWrapper, style]}
      inputStyle={[styles.inputStyle, isIOS && styles.inputStyleOnIOS, inputStyle]}
      wrapperStyle={[styles.wrapper]}
      {...rest}
    />
  );
};
