import React from 'react';
import { View } from 'react-native';

import { palette } from '../../constants/theme';
import { DEVICE_WIDTH } from '../../utils/scale';
import { styles } from './styles';
import { ProgressBarProps } from './types';

export const ProgressBar = ({ value, max = DEVICE_WIDTH, style, barStyle, color = palette.frostGreen, absolute = true }: ProgressBarProps) => {
  const width = (Math.min(value, 100) * max) / 100;

  return (
    <View style={[styles.wrapper, style]}>
      <View style={[styles.bar, absolute && styles.absolute, { backgroundColor: color, width }, barStyle]} />
    </View>
  );
};
