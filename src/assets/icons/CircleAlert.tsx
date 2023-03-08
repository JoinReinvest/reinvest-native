import React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {theme} from '../theme';

const CircleAlert = ({color = theme.pureBlack, ...rest}: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...rest}>
    <Path
      d="M16 9c-3.861 0-7 3.139-7 7s3.139 7 7 7 7-3.139 7-7-3.139-7-7-7Zm0 12.482A5.49 5.49 0 0 1 10.518 16 5.49 5.49 0 0 1 16 10.518 5.49 5.49 0 0 1 21.482 16 5.49 5.49 0 0 1 16 21.482Z"
      fill={color}
    />
    <Path
      d="M16 17.032a.755.755 0 0 0 .752-.752v-3.463a.755.755 0 0 0-.752-.752.755.755 0 0 0-.752.752v3.448c0 .428.34.767.752.767ZM16.928 18.741a.928.928 0 1 1-1.857 0 .928.928 0 0 1 1.857 0Z"
      fill={color}
    />
  </Svg>
);

export default CircleAlert;
