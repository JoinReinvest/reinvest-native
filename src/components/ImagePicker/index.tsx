import { isIOS } from '@constants/common';
import { requestWriteExternalStoragePermission } from '@src/permissions/requestWriteExternalStoragePermission';
import React, { PropsWithChildren } from 'react';
import { Pressable } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { BaseImagePickerOptions, ImagePickerProps } from './types';

const baseOptions: BaseImagePickerOptions = {
  mediaType: 'photo',
  includeBase64: false,
  includeExtra: true,
};

export const ImagePicker = ({ type, onSelect, children, selectionImageLimit = 1, ...rest }: PropsWithChildren<ImagePickerProps>) => {
  const onButtonPress = async () => {
    if (type === 'capture') {
      if (!isIOS) {
        // permission to write storage is needed in Android 28 or below
        await requestWriteExternalStoragePermission();
      }

      await launchCamera(
        {
          ...baseOptions,
          saveToPhotos: true,
        },
        onSelect,
      );
    }

    if (type === 'library') {
      await launchImageLibrary(
        {
          ...baseOptions,
          selectionLimit: selectionImageLimit,
        },
        onSelect,
      );
    }
  };

  return (
    <Pressable
      onPress={onButtonPress}
      {...rest}
    >
      {children}
    </Pressable>
  );
};
