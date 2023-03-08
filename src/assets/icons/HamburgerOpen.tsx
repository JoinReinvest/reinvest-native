import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {palette} from '@assets/theme';

const HamburgerOpen = ({color = palette.pureBlack, ...rest}: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...rest}>
    <Path
      stroke={color}
      strokeWidth={1.5}
      d="M7 9.25h18M7 15.25h15M7 21.25h18"
    />
  </Svg>
);

export default HamburgerOpen;
