import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';

export const RecurringBig = ({ color }: SvgProps) => (
  <Svg
    width={'100%'}
    height={'100%'}
    viewBox="0 0 97 96"
    fill="none"
  >
    <G
      stroke="#000"
      strokeWidth={4}
      clipPath="url(#a)"
    >
      <Path d="M80.5 44a32.4 32.4 0 0 0-62-8m-2-16v16h16M16.5 52a32.4 32.4 0 0 0 62 8m2 16V60h-16" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path
          fill={color}
          d="M.5 0h96v96H.5z"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
