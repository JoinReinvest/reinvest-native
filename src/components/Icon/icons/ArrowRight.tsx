import { palette } from '@constants/theme';
import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const ArrowRight = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    {...rest}
  >
    <Path
      d="m13 21 5-5-5-5"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
