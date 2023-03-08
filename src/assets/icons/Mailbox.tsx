import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, SvgProps} from 'react-native-svg';
import {palette} from '@assets/theme';

const Mailbox = ({color = palette.pureBlack, ...rest}: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...rest}>
    <G
      clipPath="url(#a)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="square">
      <Path d="M14.444 23v-5.056a2.722 2.722 0 1 0-5.444 0V23h14v-4.667a3.111 3.111 0 0 0-3.111-3.11h-8.167" />
      <Path d="M16 15.222V9h3.111l1.556 1.556-1.556 1.555H16M11.333 18.333h.778" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="none" d="M0 0h32v32H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Mailbox;
