import React from 'react';
import Svg, {Path, Rect, SvgProps} from 'react-native-svg';
import {palette} from '@assets/theme';

const Checkbox = ({color = palette.pureBlack, ...rest}: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...rest}>
    <Rect x={4} y={4} width={24} height={24} rx={12} fill={palette.lightGray} />
    <Path
      d="m20.546 13.536-6.01 6.01L11 16.01"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Checkbox;
