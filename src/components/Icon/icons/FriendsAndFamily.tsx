import React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const FriendsAndFamily = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
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
      <Path d="M12.21 11.947a1.474 1.474 0 1 0 0-2.947 1.474 1.474 0 0 0 0 2.947ZM10.737 23v-3.684L10 18.579V15.63a.737.737 0 0 1 .737-.736h2.947a.737.737 0 0 1 .737.736v2.948l-.737.737V23M19.579 11.947a1.474 1.474 0 1 0 0-2.947 1.474 1.474 0 0 0 0 2.947ZM18.105 23v-2.948h-1.473l1.473-4.42a.737.737 0 0 1 .737-.737h1.474a.737.737 0 0 1 .737.736l1.473 4.421h-1.473V23" />
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
