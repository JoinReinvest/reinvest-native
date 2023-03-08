import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, SvgProps} from 'react-native-svg';
import {palette} from '@assets/theme';

const File = ({color = palette.pureBlack, ...rest}: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...rest}>
    <G clipPath="url(#a)" stroke={color} strokeWidth={1.5}>
      <Path
        d="M18 9v3.111a.778.778 0 0 0 .778.778h3.11"
        strokeLinecap="square"
      />
      <Path
        d="M20.333 23h-7.777A1.556 1.556 0 0 1 11 21.444V10.556A1.556 1.556 0 0 1 12.556 9h6.027l3.306 3.306v9.138A1.556 1.556 0 0 1 20.333 23Z"
        strokeLinecap="round"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="none" d="M0 0h32v32H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default File;
