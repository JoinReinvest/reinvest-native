import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {palette} from '@constants/theme';

export const EducationIcon = ({
  focused = false,
  ...props
}: SvgProps & {focused: boolean}) => (
  <Svg width={23} height={19} fill="none" {...props}>
    {!focused ? (
      <>
        <Path
          d="M1.375 9.318v7.574a10 10 0 0 1 10 0 10 10 0 0 1 10 0V8.818"
          stroke={palette.pureBlack}
          strokeWidth={1.5}
          strokeLinecap="square"
        />
        <Path
          d="M1.375 10.319V2.447a10 10 0 0 1 10 0 10 10 0 0 1 10 0v5.87M11.375 2.448v13.444"
          stroke={palette.pureBlack}
          strokeWidth={1.5}
          strokeLinecap="square"
        />
      </>
    ) : (
      <Path
        d="M5.081 14.136a9.413 9.413 0 0 0-4.706 1.261V1.85c1.412-.941 5.271-2.259 9.413 0v13.548a9.413 9.413 0 0 0-4.707-1.262ZM15.669 14.136a9.414 9.414 0 0 0-4.707 1.261V1.85c1.412-.941 5.271-2.259 9.413 0v13.548a9.413 9.413 0 0 0-4.706-1.262Z"
        fill={palette.pureBlack}
        stroke={palette.pureBlack}
        strokeWidth={0.5}
        strokeLinecap="square"
      />
    )}
  </Svg>
);
