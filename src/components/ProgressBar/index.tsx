import React from 'react';
import {DEVICE_WIDTH} from '@src/utils/scale';
import {View} from 'react-native';
import {palette} from '@src/constants/theme';
import {ProgressBarProps} from './types';
import {styles} from './styles';

export const ProgressBar = ({
  value,
  max = DEVICE_WIDTH,
  style,
  barStyle,
  color = palette.frostGreen,
  absolute = true,
}: ProgressBarProps) => {
  const width = (Math.min(value, 100) * max) / 100;

  return (
    <View style={[styles.wrapper, style]}>
      <View
        style={[
          styles.bar,
          absolute && styles.absolute,
          {backgroundColor: color, width},
          barStyle,
        ]}
      />
    </View>
  );
};
