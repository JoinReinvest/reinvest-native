import React, {PropsWithChildren, useMemo} from 'react';
import {Pressable, View, ViewStyle} from 'react-native';
import {palette} from '@constants/theme';
import type {
  BoxProps,
  SizesEnum,
  SpacingProps,
} from '@components/Containers/Box/types';
import {sizes} from '@components/Containers/Box/types';

import {xScale, yScale} from '@utils/scale';
import {hexToRgbA} from '@utils/hexToRgb';

const getSize = (size: SizesEnum | undefined) => size && sizes[size];

function generateSpacings<T extends SpacingProps>(props: T): ViewStyle {
  return {
    padding: getSize(props.p),
    paddingRight: getSize(props.pr),
    paddingTop: getSize(props.pt),
    paddingBottom: getSize(props.pb),
    paddingLeft: getSize(props.pl),
    paddingVertical: yScale(getSize(props.py)),
    paddingHorizontal: xScale(getSize(props.px)),
    margin: getSize(props.m),
    marginRight: getSize(props.mr),
    marginTop: getSize(props.mt),
    marginBottom: getSize(props.mb),
    marginLeft: getSize(props.ml),
    marginVertical: getSize(props.my),
    marginHorizontal: getSize(props.mx),
  };
}

export const Box = ({
  children,
  alignItems,
  justifyContent,
  color,
  width,
  height,
  flex,
  radius,
  style,
  flexShrink,
  flexBasis,
  flexDirection,
  flexGrow,
  alignSelf,
  onPress,
  fw,
  colorOpacity = 1,
  ...props
}: PropsWithChildren<BoxProps>) => {
  const spacings = useMemo(
    () => generateSpacings(props),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      props.m,
      props.mb,
      props.ml,
      props.mr,
      props.mt,
      props.mx,
      props.my,
      props.pb,
      props.pl,
      props.pr,
      props.pt,
      props.px,
      props.py,
      props.p,
    ],
  );

  const Container = onPress ? Pressable : View;

  return (
    <Container
      onPress={onPress}
      style={[
        spacings,
        {
          borderRadius: radius,
          alignItems,
          justifyContent,
          backgroundColor: color
            ? hexToRgbA(palette[color], colorOpacity)
            : undefined,
          width: fw ? '100%' : width,
          height,
          flex,
          flexBasis,
          flexDirection,
          flexGrow,
          flexShrink,
          alignSelf,
        },
        style,
      ]}>
      {children}
    </Container>
  );
};
