import React from 'react';
import Svg, { Rect, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const CheckboxUnchecked = ({ color = palette.frostGreen, ...rest }: SvgProps) => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 , 0 , 32, 32"
    fill="none"
    {...rest}
  >
    <Rect
      x={4.5}
      y={4.5}
      width={24}
      height={24}
      rx={11.5}
      stroke={color}
    />
  </Svg>
);
