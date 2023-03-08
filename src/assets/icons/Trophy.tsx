import React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
import {theme} from '@assets/theme';

const Trophy = ({color = theme.pureBlack, ...rest}: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...rest}>
    <G clipPath="url(#a)" stroke={color} strokeWidth={1.5}>
      <Path
        d="M12.889 22.222h6.222M16 19.111v3.111M12.111 9h7.778M19.889 9v6.222a3.889 3.889 0 1 1-7.778 0V9"
        strokeLinecap="square"
      />
      <Path
        d="M10.556 14.444a1.556 1.556 0 1 0 0-3.11 1.556 1.556 0 0 0 0 3.11ZM21.444 14.444a1.556 1.556 0 1 0 0-3.11 1.556 1.556 0 0 0 0 3.11Z"
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

export default Trophy;
