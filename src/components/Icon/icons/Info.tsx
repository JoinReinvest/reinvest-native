import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const Info = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 , 0 , 32, 32"
    fill="none"
    {...rest}
  >
    <Path
      d="M17.317 18.712h-.474a.949.949 0 0 1-.947-.944v-2.36a.471.471 0 0 0-.473-.472h-.474"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.66 13.047a.236.236 0 1 1 0-.472M15.662 13.047a.236.236 0 0 0 0-.472"
      stroke={color}
      strokeWidth={1.5}
    />
    <Path
      d="M15.898 22.96c3.922 0 7.102-3.17 7.102-7.08S19.82 8.8 15.898 8.8c-3.923 0-7.102 3.17-7.102 7.08s3.18 7.08 7.102 7.08Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
