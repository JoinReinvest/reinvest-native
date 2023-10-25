import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const AddUser = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
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
    >
      <Path d="M13.667 15.222a3.111 3.111 0 1 0 0-6.222 3.111 3.111 0 0 0 0 6.222ZM9 23v-1.555a3.111 3.111 0 0 1 3.111-3.112h3.111a3.111 3.111 0 0 1 3.111 3.112V23M19.111 15.222h4.667m-2.334-2.333v4.667" />
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
