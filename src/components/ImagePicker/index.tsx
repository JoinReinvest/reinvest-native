import React, { PropsWithChildren } from 'react';
import { Pressable } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { isIOS } from '../../constants/common';
import { requestAndroidPermissions } from '../../permissions/requestAndroidPermissions';
import { BaseImagePickerOptions, ImagePickerProps } from './types';

export const baseOptions: BaseImagePickerOptions = {
  mediaType: 'photo',
  includeBase64: false,
  includeExtra: true,
};

export const ImagePicker = ({
  type,
  onSelect,
  children,
  selectionImageLimit = 1,
  setLoading,
  preAction,
  pickerOptions,
  ...rest
}: PropsWithChildren<ImagePickerProps>) => {
  const onButtonPress = async () => {
    preAction?.();
    setLoading?.(true);

    if (type === 'capture') {
      if (!isIOS) {
        // permission to write storage is needed in Android 28 or below
        await requestAndroidPermissions('camera');
        await requestAndroidPermissions('externalStorage');
      }

      launchCamera(
        {
          ...baseOptions,
          saveToPhotos: true,
          ...pickerOptions,
        },
        onSelect,
      );
    }

    if (type === 'library') {
      launchImageLibrary(
        {
          ...baseOptions,
          selectionLimit: selectionImageLimit,
          ...pickerOptions,
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
