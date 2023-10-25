import React from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const CircleChevron = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 , 0 , 16, 16"
    fill="none"
    {...rest}
  >
    <Circle
      cx="8"
      cy="8"
      r="8"
      fill={color}
    />
    <Path
      d="M4.9996 9.5L7.945 6.56027C7.96411 6.54116 7.98681 6.52601 8.0118 6.51566C8.03679 6.50532 8.06357 6.5 8.09062 6.5C8.11767 6.5 8.14446 6.50532 8.16944 6.51566C8.19443 6.52601 8.21713 6.54116 8.23624 6.56027L11.1816 9.5"
      stroke={palette.pureWhite}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
