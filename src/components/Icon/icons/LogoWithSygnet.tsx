import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

import { palette } from '../../../constants/theme';

export const LogoWithSygnet = ({ color = palette.pureBlack, ...rest }: SvgProps) => (
  <Svg
    width={153}
    height={39}
    fill="none"
    {...rest}
  >
    <Path
      d="M48.562 9.39h5.47c2.25 0 2.92-1.127 2.92-2.278 0-1.128-.668-2.21-2.92-2.21h-5.47v4.489Zm4.752 2.97h-4.752v5.778h-4.678V1.795H55.1c5.284 0 6.817 2.693 6.817 5.178 0 1.819-.928 3.959-3.685 4.858l4.288 6.306h-5.29l-3.917-5.777ZM81.544 14.87v3.268h-16.78V1.795h16.618v3.269H69.446v3.268h11.542v3.04H69.446v3.498h12.098ZM48.563 21.527h-4.682v16.344h4.682V21.527ZM52.34 21.527h5.012l8.555 9.276c.534.645.996 1.195 1.296 1.842h.094V21.527h4.241v16.344h-4.666l-8.877-9.369c-.44-.507-1.07-1.335-1.322-1.858h-.092v11.234H52.34v-16.35ZM72.482 21.527h5.213l5.145 10.98c.248.53.435 1.086.557 1.658h.093a7.49 7.49 0 0 1 .534-1.658l5.141-10.98h5.238L86.25 37.871h-5.633l-8.135-16.344ZM112.276 34.602v3.27h-16.78V21.526h16.619v3.269h-11.937v3.268h11.542v3.04h-11.542v3.498h12.098ZM113.715 34.256l3.341-2.325c1.368 1.91 3.894 3.224 7.254 3.224 2.99 0 4.38-.623 4.38-1.912 0-1.013-.695-1.427-2.642-1.634l-5.053-.552c-4.01-.437-5.979-1.91-5.979-4.926 0-3.246 3.198-5.177 8.83-5.177 4.144 0 7.393 1.082 9.456 3.384l-2.969 2.461c-1.203-1.636-3.569-2.602-6.721-2.602-2.55 0-3.917.599-3.917 1.726 0 .989.668 1.38 2.781 1.593l4.519.46c4.545.461 6.416 1.796 6.416 4.812 0 3.636-3.383 5.662-9.34 5.662-4.867 0-8.667-1.612-10.359-4.19M134.645 21.527v3.614h6.836v12.73h4.681v-12.73h6.839v-3.614h-18.356ZM0 1.742l24.455 36.112h12.097L12.097 1.742H0ZM12.409 22.005H.291v15.849h12.118v-15.85ZM37.493 9.069a8.478 8.478 0 0 0-1.445-4.733 8.565 8.565 0 0 0-3.85-3.138 8.632 8.632 0 0 0-4.956-.484 8.595 8.595 0 0 0-4.391 2.331 8.501 8.501 0 0 0-2.348 4.363 8.465 8.465 0 0 0 .49 4.922 8.531 8.531 0 0 0 3.159 3.823 8.624 8.624 0 0 0 8.048.787 8.579 8.579 0 0 0 2.782-1.847 8.513 8.513 0 0 0 1.86-2.764 8.466 8.466 0 0 0 .651-3.26Z"
      fill={color}
    />
  </Svg>
);
