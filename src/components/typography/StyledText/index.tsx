import React, { PropsWithChildren } from 'react';
import { Text } from 'react-native';

import styles from './styles';
import { StyledTextProps } from './types';

export const StyledText = ({ children, style, color = 'black', variant = 'label', ...rest }: PropsWithChildren<StyledTextProps>) => (
  <Text
    allowFontScaling={false}
    style={[styles.text, styles[`${variant}`], { color }, style]}
    {...rest}
  >
    {children}
  </Text>
);
