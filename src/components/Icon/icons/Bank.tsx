import React from 'react';
import Svg, {ClipPath, Defs, G, Path, SvgProps} from 'react-native-svg';
import {palette} from '@constants/theme';

export const Bank = ({color = palette.pureBlack, ...rest}: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...rest}>
    <G
      clipPath="url(#a)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="round">
      <Path d="M9 23h14M9 14.444h14M10.556 11.333 16 9l5.444 2.333M9.778 14.444V23M22.222 14.444V23M12.889 17.555v2.334M16 17.555v2.334M19.111 17.555v2.334" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="none" d="M0 0h32v32H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
