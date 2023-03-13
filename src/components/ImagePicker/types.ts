import {PressableProps} from 'react-native';
import {ImagePickerResponse, OptionsCommon} from 'react-native-image-picker';

export type ImagePickerActionTypes = 'capture' | 'library';

export type BaseImagePickerOptions = Pick<
  OptionsCommon,
  'mediaType' | 'includeBase64' | 'includeExtra'
>;

export interface ImagePickerProps
  extends Omit<PressableProps, 'onPress' | 'children'> {
  type: ImagePickerActionTypes;
  onSelect: (response: ImagePickerResponse) => void;
  selectionImageLimit?: number;
}
