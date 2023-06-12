import React from 'react';
import Svg, { Path, Rect, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const Car = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
  <Svg
    width={52}
    height={52}
    fill="none"
    {...rest}
  >
    <Path
      fill={color}
      d="M9 34h6v5a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-5ZM37 34h6v5a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-5Z"
    />
    <Rect
      width={6}
      height={4}
      x={41}
      y={20}
      fill={color}
      rx={1}
    />
    <Rect
      width={6}
      height={4}
      x={5}
      y={20}
      fill={color}
      rx={1}
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M9 25a1 1 0 0 1 1-1h32a1 1 0 0 1 1 1v9H9v-9Zm2 3.5a1.5 1.5 0 0 1 1.5-1.5h5a1.5 1.5 0 0 1 0 3h-5a1.5 1.5 0 0 1-1.5-1.5ZM34.5 27a1.5 1.5 0 0 0 0 3h5a1.5 1.5 0 0 0 0-3h-5Z"
      clipRule="evenodd"
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="m11.003 21 2-6c.333-1 1.6-3 4-3h19c.666 0 2.2.6 3 3 .486 1.459 1.365 4.284 2.054 6.5.326 1.048.61 1.96.79 2.527a.364.364 0 0 1-.348.473H10.26a.5.5 0 0 1-.46-.697L11.003 21Zm2.735 2.334 2.647-7.5a.5.5 0 0 1 .471-.334H35.15a.5.5 0 0 1 .471.334l2.648 7.5a.5.5 0 0 1-.472.666H14.209a.5.5 0 0 1-.471-.666Z"
      clipRule="evenodd"
    />
  </Svg>
);
