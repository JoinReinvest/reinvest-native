import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {palette} from '@constants/theme';

export const HamburgerClose = ({
  color = palette.pureBlack,
  ...rest
}: SvgProps) => (
  <Svg
    width={'100%'}
    height={'100%'}
    viewBox={'0 , 0 , 32, 32'}
    fill="none"
    {...rest}>
    <Path
      stroke={color}
      strokeWidth={1.5}
      d="m9.53 9.47 13.435 13.435M9.177 22.905 22.612 9.47"
    />
  </Svg>
);
