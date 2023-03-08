import React from 'react';
import Svg, {ClipPath, Defs, G, Path, SvgProps} from 'react-native-svg';
import {palette} from '@assets/theme';

const Loading = ({color = palette.pureBlack, ...rest}: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...rest}>
    <G
      clipPath="url(#a)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="round">
      <Path d="M16 11.333V9M19.305 12.694l1.673-1.672M20.667 16H23M19.305 19.305l1.673 1.673M16 20.667V23M12.694 19.305l-1.672 1.673M11.333 16H9M12.694 12.694l-1.672-1.672" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="none" d="M0 0h32v32H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Loading;
