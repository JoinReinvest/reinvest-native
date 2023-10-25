import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const Upload = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
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
    >
      <Path
        d="M18 9v3.111a.778.778 0 0 0 .778.778h3.11"
        strokeLinecap="square"
      />
      <Path
        d="M20.333 23h-7.777A1.556 1.556 0 0 1 11 21.444V10.556A1.556 1.556 0 0 1 12.556 9H19l2.889 2.889v9.555A1.556 1.556 0 0 1 20.333 23Z"
        strokeLinecap="round"
      />
      <Path
        d="M16.445 16.222v3.667"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <Path
        d="m14.111 17.556 2.333-2.334 2.334 2.334"
        strokeLinecap="square"
      />
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
