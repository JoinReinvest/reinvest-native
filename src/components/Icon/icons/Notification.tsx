import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const Notification = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 , 0 , 32, 32"
    fill="none"
    {...rest}
  >
    <Path
      d="M8.441 20.951a2.05 2.05 0 0 0 2.05 2.05h9.56a2.05 2.05 0 0 0 2.049-2.05v-4.78a.683.683 0 1 0-1.366 0v4.78a.683.683 0 0 1-.683.683h-9.56a.683.683 0 0 1-.684-.683v-9.56a.683.683 0 0 1 .683-.684h4.78a.683.683 0 0 0 0-1.365h-4.78a2.05 2.05 0 0 0-2.049 2.048v9.561Z"
      fill={color}
    />
    <Path
      d="M22.441 11.732a2.732 2.732 0 1 1-5.463 0 2.732 2.732 0 0 1 5.463 0Z"
      fill={color}
    />
  </Svg>
);
