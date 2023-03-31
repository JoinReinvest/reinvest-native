import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const Share = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    {...rest}
  >
    <Path
      d="M11 15.875v5.5a1.375 1.375 0 0 0 1.375 1.375h8.25A1.375 1.375 0 0 0 22 21.375v-5.5M19.25 11.75 16.5 9l-2.75 2.75M16.5 9v8.938"
      stroke={color}
      strokeWidth={1.5}
    />
  </Svg>
);
