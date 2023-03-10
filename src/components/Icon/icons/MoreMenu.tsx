import React from 'react';
import Svg, {Rect, SvgProps} from 'react-native-svg';
import {palette} from '@constants/theme';

export const MoreMenu = ({color = palette.lightGray, ...rest}: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...rest}>
    <Rect x={14} y={22} width={4} height={4} rx={2} fill={color} />
    <Rect x={14} y={14} width={4} height={4} rx={2} fill={color} />
    <Rect x={14} y={6} width={4} height={4} rx={2} fill={color} />
  </Svg>
);
