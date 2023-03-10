import React from 'react';
import Svg, {ClipPath, Defs, G, Path, SvgProps} from 'react-native-svg';
import {palette} from '@constants/theme';

export const EyeHide = ({color = palette.pureBlack, ...rest}: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...rest}>
    <G
      clipPath="url(#a)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round">
      <Path d="m8.778 9 14 14" strokeLinecap="square" />
      <Path
        d="M14.676 14.901a1.556 1.556 0 0 0 2.2 2.201"
        strokeLinecap="round"
      />
      <Path
        d="M13.727 10.84a7.36 7.36 0 0 1 2.05-.284c3.112 0 5.704 1.814 7.779 5.444-.606 1.059-1.254 1.963-1.947 2.713m-1.665 1.447a7.296 7.296 0 0 1-4.166 1.285C12.667 21.445 10.074 19.63 8 16c1.065-1.863 2.266-3.247 3.603-4.154"
        strokeLinecap="square"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="none" d="M0 0h32v32H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
