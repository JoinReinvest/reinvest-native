import React from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const Search = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 , 0 , 32, 32"
    fill="none"
    {...rest}
  >
    <Circle
      cx={14.5}
      cy={14.5}
      r={4.75}
      stroke={color}
      strokeWidth={1.5}
    />
    <Path
      stroke={color}
      strokeWidth={1.5}
      d="m18.486 17.425 4.044 4.045"
    />
  </Svg>
);
