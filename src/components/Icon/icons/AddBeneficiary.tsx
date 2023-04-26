import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const AddBeneficiary = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 , 0 , 32, 32"
    fill="none"
    {...rest}
  >
    <G
      stroke={color}
      strokeLinecap="square"
      strokeWidth={1.5}
      clipPath="url(#a)"
    >
      <Path d="M13.667 15.222a3.111 3.111 0 1 0 0-6.222 3.111 3.111 0 0 0 0 6.222ZM9 23v-1.556a3.111 3.111 0 0 1 3.111-3.111h3.111a3.111 3.111 0 0 1 3.111 3.11V23M19.11 9.101a3.112 3.112 0 0 1 0 6.028M23 23v-1.556a3.11 3.11 0 0 0-2.334-2.994" />
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
