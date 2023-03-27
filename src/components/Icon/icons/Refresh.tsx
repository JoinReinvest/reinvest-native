import { palette } from '@constants/theme';
import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';

export const Refresh = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
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
      strokeLinecap="square"
    >
      <Path d="M23 15.123a7.106 7.106 0 0 0-2.033-4.068 7.083 7.083 0 0 0-8.532-1.103c-1.347.78-2.4 1.542-2.998 2.98M9 9.864v3.506h3.5M9 16.877a7.106 7.106 0 0 0 2.033 4.068 7.083 7.083 0 0 0 8.532 1.103c1.347-.78 2.4-1.542 2.997-2.98M23 22.137V18.63h-3.5" />
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
