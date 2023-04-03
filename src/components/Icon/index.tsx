import { useMemo } from 'react';
import React, { StyleSheet, TouchableOpacity, View } from 'react-native';

import { defaultHitSlop } from '../../constants/common';
import { palette } from '../../constants/theme';
import { icons, sizes } from './constants';
import { IconProps } from './types';

export const Icon = ({
  icon,
  //TODO extend icons with 100% width and height of a parent component
  size = 'm',
  color = palette.pureBlack,
  onPress,
  style,
  ...props
}: IconProps) => {
  const IconComp = icons[`${icon}`];
  const styles = useMemo(() => StyleSheet.flatten([{ width: sizes[`${size}`], height: sizes[`${size}`] }, style]), [size, style]);

  if (onPress) {
    return (
      <TouchableOpacity
        style={styles}
        onPress={onPress}
        hitSlop={defaultHitSlop}
      >
        <IconComp
          width={sizes[`${size}`]}
          height={sizes[`${size}`]}
          color={color}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles}>
      <IconComp
        {...props}
        color={color}
      />
    </View>
  );
};
