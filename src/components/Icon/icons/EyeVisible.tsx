import React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const EyeVisible = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 , 0 , 32, 32"
    fill="none"
    {...rest}
  >
    <G
      clipPath="url(#a)"
      stroke={color}
      strokeWidth={1.5}
      strokeLinejoin="round"
    >
      <Path
        d="M16 17.7333C17.031 17.7333 17.8667 16.8976 17.8667 15.8667C17.8667 14.8357 17.031 14 16 14C14.9691 14 14.1334 14.8357 14.1334 15.8667C14.1334 16.8976 14.9691 17.7333 16 17.7333Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M25.3334 15.8663C22.8442 20.2222 19.7334 22.3997 16 22.3997C12.2667 22.3997 9.15589 20.2222 6.66669 15.8663C9.15589 11.5105 12.2667 9.33301 16 9.33301C19.7334 9.33301 22.8442 11.5105 25.3334 15.8663Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path
          fill="none"
          d="M0 0h32v32H0z"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
