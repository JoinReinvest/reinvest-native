import { Permission, PermissionsAndroid } from 'react-native';

export interface PermissionsOptions {
  onError: () => void;
  onGranted: () => void;
  onRejected: () => void;
}
const permissionsArgs = {
  camera: [
    PermissionsAndroid.PERMISSIONS.CAMERA,
    {
      title: 'App Camera Permission',
      message: 'App needs access to your camera ',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  ],
  externalStorage: [
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: 'App Library Permission',
      message: 'App needs access to your library',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  ],
} as const;

export const requestAndroidPermissions = async (type: keyof typeof permissionsArgs, options?: Partial<PermissionsOptions>) => {
  try {
    const [permission, rationale] = permissionsArgs[`${type}`];
    const granted = await PermissionsAndroid.request(permission as Permission, rationale);

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
