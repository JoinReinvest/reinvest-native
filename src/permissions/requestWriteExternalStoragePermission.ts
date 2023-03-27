import { PermissionsAndroid } from 'react-native';

export interface PermissionsOptions {
  onError: () => void;
  onGranted: () => void;
  onRejected: () => void;
}

export const requestWriteExternalStoragePermission = async (options?: Partial<PermissionsOptions>) => {
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
      title: 'App Library Permission',
      message: 'App needs access to your library',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      options?.onGranted?.();
    }

    if (granted === PermissionsAndroid.RESULTS.DENIED) {
      options?.onRejected?.();
    }
  } catch (err) {
    options?.onError?.();
  }
};
