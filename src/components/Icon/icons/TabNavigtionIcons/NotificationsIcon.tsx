import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../../constants/theme';

export const NotificationIcon = ({ focused = false, ...props }: SvgProps & { focused: boolean }) => (
  <Svg
    width={20}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      d="M7.903 3.222a2.222 2.222 0 1 1 4.444 0 7.777 7.777 0 0 1 4.445 6.667v3.333a4.444 4.444 0 0 0 2.222 3.333H1.236a4.444 4.444 0 0 0 2.222-3.333V9.89a7.778 7.778 0 0 1 4.445-6.667ZM6.792 16.555v1.112a3.333 3.333 0 0 0 6.666 0v-1.112"
      stroke={palette.pureBlack}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={focused ? palette.pureBlack : 'none'}
    />
  </Svg>
);
