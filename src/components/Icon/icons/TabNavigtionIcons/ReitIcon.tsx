import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {palette} from '@constants/theme';

export const ReitIcon = ({
  focused = false,
  ...props
}: SvgProps & {focused: boolean}) => (
  <Svg width={23} height={22} fill="none" {...props}>
    {!focused ? (
      <Path
        d="M12.736 21v-7.778L7.181 7.667l-5.556 5.555V21h5.556m5.555 0H7.181m5.555 0h8.889V1H8.292v6.778M7.18 21v-4.444M12.736 5.444v.012M17.18 5.444v.012M17.18 9.889V9.9M17.18 14.333v.011"
        stroke={palette.pureBlack}
        strokeWidth={1.5}
        strokeLinecap="square"
      />
    ) : (
      <>
        <Path fill="#000" d="M8.125 0h13v20h-13z" />
        <Path
          d="m6.18 6.667 5.556 5.555V20H6.181v-4.444m0 4.444H.625v-7.778l5.556-5.555"
          fill={palette.pureBlack}
        />
        <Path
          d="M11.736 4.444v.012M16.18 4.444v.012M16.18 8.889V8.9M16.18 13.333v.011"
          stroke={palette.pureWhite}
          strokeWidth={1.5}
          strokeLinecap="square"
        />
        <Path stroke="#fff" d="M6.125 15v4" />
      </>
    )}
  </Svg>
);
