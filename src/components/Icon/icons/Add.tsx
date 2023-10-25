import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const Add = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 , 0 , 32, 32"
    fill="none"
    {...rest}
  >
    <Path
      d="M9 16h14M16 9v14"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
