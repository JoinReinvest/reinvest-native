import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {theme} from '@assets/theme';

const Sygnet = ({color = theme.frostGreen, ...rest}: SvgProps) => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 72 72" fill="none" {...rest}>
      <Path
        d="M0 2.302 46.963 72h23.23L23.23 2.302H0ZM23.83 41.41H.56V72h23.27V41.41ZM72 16.443c0-3.253-.966-6.432-2.776-9.136a16.465 16.465 0 0 0-7.393-6.056 16.498 16.498 0 0 0-17.95 3.566 16.416 16.416 0 0 0-3.569 17.92 16.449 16.449 0 0 0 6.067 7.378 16.492 16.492 0 0 0 15.455 1.52 16.47 16.47 0 0 0 5.344-3.565A16.436 16.436 0 0 0 72 16.443Z"
        fill={color}
      />
    </Svg>
  );
};

export default Sygnet;
