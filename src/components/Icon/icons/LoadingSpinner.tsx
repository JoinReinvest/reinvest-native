import * as React from 'react';
import Svg, { Defs, Path, RadialGradient, Stop, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const LoadingSpinner = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
  <Svg
    width={56}
    height={56}
    viewBox="0 0 56 56"
    fill="none"
    {...rest}
  >
    <Path
      d="M53 28C53 32.9445 51.5338 37.778 48.7867 41.8893C46.0397 46.0005 42.1352 49.2048 37.5671 51.097C32.9989 52.9892 27.9723 53.4843 23.1227 52.5196C18.2732 51.555 13.8186 49.174 10.3223 45.6777C6.82602 42.1814 4.445 37.7268 3.48037 32.8773C2.51574 28.0277 3.01082 23.0011 4.90301 18.4329C6.7952 13.8648 9.99952 9.96029 14.1107 7.21326C18.222 4.46622 23.0555 3 28 3"
      stroke="url(#paint0_radial_9662_9816)"
      strokeWidth={5}
    />
    <Defs>
      <RadialGradient
        id="paint0_radial_9662_9816"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(50.5 37) rotate(-123.495) scale(40.7707 54.6441)"
      >
        <Stop
          offset={0.25}
          stopOpacity={0}
          stopColor={color}
        />
        <Stop
          offset={1}
          stopColor={color}
        />
      </RadialGradient>
    </Defs>
  </Svg>
);
