import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';
import {theme} from '@assets/theme';

const Disabled = ({color = theme.pureBlack, ...rest}: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...rest}>
    <Circle
      cx={16.5}
      cy={16.5}
      r={5.75}
      transform="rotate(45 16.5 16.5)"
      stroke={color}
      strokeWidth={1.5}
    />
    <Path stroke={color} strokeWidth={1.5} d="m21.273 12.081-8.485 8.485" />
  </Svg>
);

export default Disabled;
