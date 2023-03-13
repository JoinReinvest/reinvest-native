import React, {PropsWithChildren} from 'react';
import {Pressable} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {BaseImagePickerOptions, ImagePickerProps} from './types';
import {requestCameraPermission} from '@permissions/requestCameraPermissions';
import {isIOS} from '@constants/common';

const baseOptions: BaseImagePickerOptions = {
  mediaType: 'photo',
  includeBase64: false,
  includeExtra: true,
};

export const ImagePicker = ({
  type,
  onSelect,
  children,
  selectionImageLimit = 1,
  ...rest
}: PropsWithChildren<ImagePickerProps>) => {
  const onButtonPress = async () => {
    if (type === 'capture') {
      if (!isIOS) {
        await requestCameraPermission();
      }
      launchCamera(
        {
          ...baseOptions,
          saveToPhotos: true,
        },
        onSelect,
      );
    } else if (type === 'library') {
      launchImageLibrary(
        {
          ...baseOptions,
          selectionLimit: selectionImageLimit,
        },
        onSelect,
      );
    }
  };

  return (
    <Pressable onPress={onButtonPress} {...rest}>
      {children}
    </Pressable>
  );
};
