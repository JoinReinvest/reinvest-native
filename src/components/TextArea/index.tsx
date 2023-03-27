import { Input } from '@components/Input';
import { isIOS } from '@src/constants/common';
import React from 'react';

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
