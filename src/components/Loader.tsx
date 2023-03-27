import { Icon } from '@components/Icon';
import { ThemeValues } from '@src/constants/theme';
import React, { useEffect } from 'react';
import Animated, { cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { SvgProps } from 'react-native-svg';

export interface LoaderProps extends Pick<SvgProps, 'height' | 'width'> {
  color?: ThemeValues;
}

export const Loader = ({ height = '100%', width = '100%', color }: LoaderProps) => {
  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value}deg`,
        },
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
    <Animated.View style={[animatedStyles]}>
      <Icon
        icon="loadingSpinner"
        height={height}
        width={width}
        color={color}
      />
    </Animated.View>
  );
};
