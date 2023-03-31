import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const Edit = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    {...rest}
  >
    <Path
      d="m16.664 13.086-5.43 5.43L11 20.742a.454.454 0 0 0 .508.508l2.226-.234 5.43-5.43-2.5-2.5Zm4.043-.371-1.172-1.172c-.351-.371-.957-.371-1.328 0l-1.094 1.094 2.5 2.5 1.094-1.094c.371-.371.371-.977 0-1.328Z"
      fill={color}
    />
  </Svg>
);
