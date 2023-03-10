import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, SvgProps} from 'react-native-svg';
import {palette} from '@constants/theme';

export const Link = ({color = palette.pureBlack, ...rest}: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...rest}>
    <G
      clipPath="url(#a)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="round">
      <Path d="M14.258 17.742a3.048 3.048 0 0 0 4.355 0l3.485-3.484a3.08 3.08 0 0 0-4.356-4.356l-.435.436" />
      <Path d="M17.742 14.258a3.047 3.047 0 0 0-4.355 0l-3.485 3.484a3.08 3.08 0 1 0 4.356 4.356l.435-.436" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="none" d="M0 0h32v32H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
