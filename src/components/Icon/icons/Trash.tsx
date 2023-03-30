import { palette } from '@constants/theme';
import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';

export const Trash = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
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
      <Path d="M10 12.111h12.445M14.667 15.222v4.667M17.778 15.222v4.667M11.361 12.694l.194 8.75A1.555 1.555 0 0 0 13.111 23h6.222a1.556 1.556 0 0 0 1.556-1.555l.194-8.75M13.889 12.111V9.778A.778.778 0 0 1 14.667 9h3.11a.777.777 0 0 1 .779.778v2.333" />
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
