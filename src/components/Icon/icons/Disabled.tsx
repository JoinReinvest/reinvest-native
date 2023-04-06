import * as React from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const Disabled = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 , 0 , 32, 32"
    fill="none"
    {...rest}
  >
    <Circle
      cx={16.5}
      cy={16.5}
      r={5.75}
      transform="rotate(45 16.5 16.5)"
      stroke={color}
      strokeWidth={1.5}
    />
    <Path
      stroke={color}
      strokeWidth={1.5}
      d="m21.273 12.081-8.485 8.485"
    />
  </Svg>
);
