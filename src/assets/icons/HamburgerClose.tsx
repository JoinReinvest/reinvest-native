import React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {theme} from '@assets/theme';

const HamburgerClose = ({color = theme.pureBlack, ...rest}: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...rest}>
    <Path
      stroke={color}
      strokeWidth={1.5}
      d="m9.53 9.47 13.435 13.435M9.177 22.905 22.612 9.47"
    />
  </Svg>
);

export default HamburgerClose;
