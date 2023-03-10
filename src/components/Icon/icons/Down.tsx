import {palette} from '@constants/theme';
import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, SvgProps} from 'react-native-svg';

const Down = ({color = palette.pureBlack, ...rest}: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...rest}>
    <G
      clipPath="url(#a)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="square">
      <Path d="M16 22V9M10 17l6 6M22 17l-6 6" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="none" d="M0 0h32v32H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Down;
