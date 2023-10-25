import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const Copy = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 0 23 23"
    fill="none"
    {...rest}
  >
    <Path
      stroke={color}
      strokeLinecap="square"
      strokeWidth={1.5}
      d="M22.18 19.375V6.25H6.43V22h15.75v-2.625Z"
    />
    <Path
      stroke={color}
      strokeLinecap="square"
      strokeWidth={1.5}
      d="M16.93 6.25V1H1.18v15.75h5.25"
    />
  </Svg>
);
