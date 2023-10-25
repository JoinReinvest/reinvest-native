import React from 'react';
import Svg, { Rect, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const MoreMenu = ({ color = palette.lightGray, ...rest }: SvgProps) => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 , 0 , 32, 32"
    fill="none"
    {...rest}
  >
    <Rect
      x={14}
      y={22}
      width={4}
      height={4}
      rx={2}
      fill={color}
    />
    <Rect
      x={14}
      y={14}
      width={4}
      height={4}
      rx={2}
      fill={color}
    />
    <Rect
      x={14}
      y={6}
      width={4}
      height={4}
      rx={2}
      fill={color}
    />
  </Svg>
);
