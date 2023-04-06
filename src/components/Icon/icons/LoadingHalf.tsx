import React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const LoadingHalf = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 , 0 , 32, 32"
    fill="none"
    {...rest}
  >
    <G
      clipPath="url(#a)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="round"
    >
      <Path d="M16 11.333V9M19.305 12.694l1.673-1.672M20.667 16H23M19.305 19.305l1.673 1.673" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path
          fill="none"
          d="M0 0h32v32H0z"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
