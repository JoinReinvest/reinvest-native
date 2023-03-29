import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const ArrowLeft = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    {...rest}
  >
    <Path
      d="m18 11-5 5 5 5"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
