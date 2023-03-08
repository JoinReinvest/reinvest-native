import React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
import {theme} from '@assets/theme';

const Tick = ({color = theme.pureBlack, ...rest}: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...rest}>
    <G clipPath="url(#a)">
      <Path
        d="m9 15.667 4.667 4.666L23 11"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="none" d="M0 0h32v32H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Tick;
