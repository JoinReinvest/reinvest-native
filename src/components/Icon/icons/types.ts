import {SvgProps} from 'react-native-svg';

type IconSize = 'small' | 'large';

export interface SizableSvgProps extends SvgProps {
  size: IconSize;
}
