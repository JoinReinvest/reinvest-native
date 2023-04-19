import { DocumentPickerResponse } from 'react-native-document-picker';
import { Asset } from 'react-native-image-picker';

import { IdentificationDocument } from '../../screens/Onboarding/types';
import { BoxProps } from '../Containers/Box/types';

export interface FilePickerProps extends BoxProps {
  label: string;
  onSelect: (response: (DocumentPickerResponse | Asset)[]) => void;
  type: 'single' | 'multi';
  dark?: boolean;
  selectionLimit?: number;
  state?: (DocumentPickerResponse | Asset | IdentificationDocument)[];
}
