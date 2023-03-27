import { palette } from '@constants/theme';
import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const DashboardIcon = ({ focused = false, ...props }: SvgProps & { focused: boolean }) => (
  <Svg
    width={22}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      d="M4.653 18.914a10 10 0 1 1 12.444 0H4.653Z"
      fill={focused ? palette.pureBlack : palette.pureWhite}
      stroke={palette.pureBlack}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M10.875 13.359a2.222 2.222 0 1 0 0-4.445 2.222 2.222 0 0 0 0 4.445Z"
      stroke={focused ? palette.pureWhite : palette.pureBlack}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m12.486 9.525 2.278-2.277"
      stroke={focused ? palette.pureWhite : palette.pureBlack}
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </Svg>
);
