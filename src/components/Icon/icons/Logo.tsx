import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {palette} from '@constants/theme';

export const Logo = ({color = palette.pureBlack, ...rest}: SvgProps) => (
  <Svg width="100%" height="100%" viewBox="0 0 90 11" fill="none" {...rest}>
    <Path
      d="M2.805 5.056h3.28c1.348 0 1.75-.704 1.75-1.423 0-.705-.4-1.38-1.75-1.38h-3.28v2.803Zm2.85 1.854h-2.85v3.608H0V.313h6.726c3.168 0 4.087 1.682 4.087 3.234 0 1.136-.556 2.472-2.21 3.034l2.572 3.938H8.002L5.654 6.91ZM22.58 8.477v2.041H12.52V.313h9.964v2.042h-7.157v2.04h6.92v1.899h-6.92v2.184h7.254ZM27.19.36h-2.807v10.206h2.807V.36ZM29.453.36h3.006l5.129 5.792c.32.403.597.746.777 1.15h.056V.36h2.543v10.207h-2.797l-5.323-5.85c-.264-.317-.641-.835-.793-1.161h-.055v7.015h-2.543V.36ZM41.531.36h3.126l3.085 6.856c.149.33.26.678.334 1.035h.055c.068-.356.175-.704.32-1.035L51.535.359h3.141l-4.889 10.207H46.41L41.53.36ZM65.393 8.524v2.042H55.332V.36h9.964v2.042H58.14v2.04h6.921V6.34h-6.92v2.184h7.253ZM66.255 8.307l2.004-1.451c.82 1.193 2.335 2.013 4.35 2.013 1.792 0 2.626-.39 2.626-1.194 0-.633-.417-.891-1.585-1.02l-3.029-.346c-2.404-.272-3.585-1.193-3.585-3.076C67.036 1.206 68.953 0 72.33 0c2.485 0 4.433.676 5.67 2.113L76.22 3.65c-.721-1.021-2.14-1.625-4.03-1.625-1.529 0-2.349.374-2.349 1.078 0 .618.4.863 1.668.995l2.71.288c2.725.288 3.847 1.12 3.847 3.004 0 2.271-2.029 3.537-5.6 3.537-2.919 0-5.197-1.007-6.212-2.617M78.805.36v2.256h4.1v7.95h2.806v-7.95h4.1V.36H78.805Z"
      fill={color}
    />
  </Svg>
);
