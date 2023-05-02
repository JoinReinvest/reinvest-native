import React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const Gift = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 , 0 , 44, 44"
    fill="none"
    {...rest}
  >
    <G
      stroke={color}
      strokeLinecap="square"
      strokeWidth={2.75}
      clipPath="url(#a)"
    >
      <Path d="M36.667 14.668H5.5v7.333h33v-7.333h-1.833ZM22 14.668v23.833" />
      <Path d="M34.835 22v16.5H9.168V22M13.751 14.668a4.583 4.583 0 1 1 0-9.167c1.769-.031 3.502.827 4.974 2.462 1.471 1.635 2.613 3.972 3.276 6.705.663-2.733 1.805-5.07 3.277-6.705 1.472-1.635 3.205-2.493 4.973-2.462a4.583 4.583 0 1 1 0 9.166" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path
          fill={color}
          d="M0 0h44v44H0z"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
