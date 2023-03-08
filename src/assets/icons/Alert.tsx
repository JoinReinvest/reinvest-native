import React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
import {theme} from '@assets/theme';

const Alert = ({color = theme.pureBlack, ...rest}: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...rest}>
    <G
      clipPath="url(#a)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="square">
      <Path d="M16.008 14.267v1.747m0 3.493v.009" />
      <Path
        d="M10.562 23h10.893c.254-.002.503-.074.727-.209.223-.135.414-.33.555-.566a1.943 1.943 0 0 0 .15-1.626L17.361 9.9a1.672 1.672 0 0 0-.571-.659A1.43 1.43 0 0 0 16 9c-.279 0-.552.084-.79.242-.24.158-.438.386-.572.659L9.114 20.599a1.942 1.942 0 0 0 .13 1.595c.133.235.314.43.528.57.215.141.456.222.704.236"
        strokeMiterlimit={16}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="none" d="M0 0h32v32H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Alert;
