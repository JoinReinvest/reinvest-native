import { DocumentPickerResponse } from 'react-native-document-picker';
import { Asset } from 'react-native-image-picker';

import { BoxProps } from '../Containers/Box/types';

export interface FilePickerProps extends BoxProps {
  label: string;
  onSelect: (response: (DocumentPickerResponse | Asset)[]) => void;
  type: 'single' | 'multi';
  dark?: boolean;
  selectionLimit?: number;
}
