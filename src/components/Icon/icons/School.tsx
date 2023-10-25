import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const School = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
  <Svg
    width={52}
    height={52}
    fill="none"
    {...rest}
  >
    <Path
      fill={color}
      fillRule="evenodd"
      d="m26.01 13.116 15.034 7.258a1.25 1.25 0 0 1-1.087 2.252L25.99 15.883l-14.462 6.75a1.25 1.25 0 1 1-1.057-2.266l15.537-7.25Z"
      clipRule="evenodd"
    />
    <Path
      fill={color}
      d="M25 7a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-6V7ZM25 10h2v4h-2z"
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M13 21.5 26 15l13 6.5V46h-8v-9a1 1 0 0 0-1-1h-8a1 1 0 0 0-1 1v9h-8V21.5ZM31 26a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
      clipRule="evenodd"
    />
    <Path
      fill={color}
      d="M41 32h4a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-4V32ZM11 32H7a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4V32Z"
    />
  </Svg>
);
