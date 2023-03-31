import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const Calendar = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    {...rest}
  >
    <G
      clipPath="url(#a)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M20.889 10.556h-9.333c-.86 0-1.556.696-1.556 1.555v9.333c0 .86.696 1.556 1.556 1.556h9.333c.859 0 1.555-.697 1.555-1.556v-9.333c0-.859-.696-1.556-1.555-1.556ZM19.333 9v3.111M13.111 9v3.111M10 15.222h12.444" />
      <Path d="M14.667 18.333H13.11v1.556h1.556v-1.556Z" />
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
