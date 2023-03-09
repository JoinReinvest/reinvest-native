import {SvgProps} from 'react-native-svg';

export type IconSize = 'small' | 'medium' | 'large';

export interface SizableSvgProps extends SvgProps {
  size: IconSize;
}
