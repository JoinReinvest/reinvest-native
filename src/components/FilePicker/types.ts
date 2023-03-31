import { BoxProps } from '@components/Containers/Box/types';
import { DocumentPickerResponse } from 'react-native-document-picker';
import { Asset } from 'react-native-image-picker';

export interface FilePickerProps extends BoxProps {
  label: string;
  onSelect: (response: (DocumentPickerResponse | Asset)[]) => void;
  type: 'single' | 'multi';
  dark?: boolean;
  selectionLimit?: number;
}
