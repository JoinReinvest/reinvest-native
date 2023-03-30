import { palette } from '@constants/theme';
import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const Add = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
  <Svg
    width={32}
    height={32}
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
