import React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {theme} from '@assets/theme';

const SvgComponent = ({color = theme.pureBlack, ...rest}: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...rest}>
    <Path
      d="M9 16h14M16 9v14"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgComponent;
