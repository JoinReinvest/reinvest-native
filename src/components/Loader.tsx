import React, { useEffect } from 'react';
import { FlexAlignType } from 'react-native';
import Animated, { cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import { ThemeValues } from '../constants/theme';
import { Icon } from './Icon';
import { sizes } from './Icon/constants';
import { IconProps } from './Icon/types';

export interface LoaderProps extends Pick<IconProps, 'size'> {
  align?: 'auto' | FlexAlignType | undefined;
  color?: ThemeValues;
}

export const Loader = ({ size = 'm', color, align = 'center' }: LoaderProps) => {
  const rotation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value}deg`,
        } as never,
      ],
    };
  }, [rotation.value]);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
    );

    return () => cancelAnimation(rotation);
  }, [rotation]);

  return (
    <Animated.View style={[animatedStyles, { height: sizes[`${size}`], width: sizes[`${size}`], justifyContent: 'center', alignSelf: align }]}>
      <Icon
        icon="loadingSpinner"
        color={color}
        size={size}
      />
    </Animated.View>
  );
};
