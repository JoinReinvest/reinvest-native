import React, { PropsWithChildren } from 'react';
import { Text } from 'react-native';

import { palette } from '../../../constants/theme';
import { hexToRgbA } from '../../../utils/hexToRgb';
import styles from './styles';
import { StyledTextProps } from './types';

export const StyledText = ({
  children,
  style,
  color = 'pureBlack',
  opacity,
  textAlign,
  variant = 'label',
  bold,
  ...rest
}: PropsWithChildren<StyledTextProps>) => {
  return (
    <Text
      allowFontScaling={false}
      style={[
        styles.text,
        styles[`${variant}`],
        { color: opacity !== undefined ? hexToRgbA(palette[`${color}`], opacity) : palette[`${color}`] },
        { textAlign },
        bold && styles.bold,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};
