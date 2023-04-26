import React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const SignOut = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
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
      <Path d="M17.556 12.5v-1.75c0-.464-.164-.91-.456-1.237A1.473 1.473 0 0 0 16 9h-5.444c-.413 0-.809.184-1.1.513A1.867 1.867 0 0 0 9 10.75v10.5c0 .464.164.91.456 1.237.291.329.687.513 1.1.513H16c.413 0 .808-.184 1.1-.513.292-.328.456-.773.456-1.237V19.5M12.111 16h10.89m0 0-2.334-2.625M23 16l-2.333 2.625" />
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
