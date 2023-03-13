import {PermissionsAndroid} from 'react-native';

export interface PermissionsOptions {
  onGranted: () => void;
  onRejected: () => void;
  onError: () => void;
}

export const requestCameraPermission = async (
  options?: Partial<PermissionsOptions>,
) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      options?.onGranted?.();
    } else {
      options?.onRejected?.();
    }
  } catch (err) {
    options?.onError?.();
  }
};
