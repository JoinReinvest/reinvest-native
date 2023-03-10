import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {palette} from '@constants/theme';

export const ArrowUp = ({color = palette.pureBlack, ...rest}: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...rest}>
    <Path
      d="m11 19 5-5 5 5"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
