import React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const HelpAndSupport = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 , 0 , 32, 32"
    fill="none"
    {...rest}
  >
    <G
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#a)"
    >
      <Path d="M16 19.111a3.111 3.111 0 1 0 0-6.222 3.111 3.111 0 0 0 0 6.222Z" />
      <Path d="M16 23a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM18.333 18.333l2.606 2.606M13.667 18.333 11.06 20.94M11.061 11.061l2.606 2.606M20.939 11.061l-2.606 2.606" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path
          fill="#fff"
          d="M0 0h32v32H0z"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
