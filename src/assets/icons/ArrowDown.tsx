import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {palette} from '@assets/theme';

const ArrowDown = ({color = palette.pureBlack, ...rest}: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...rest}>
    <Path
      d="m11 14 5 5 5-5"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ArrowDown;
