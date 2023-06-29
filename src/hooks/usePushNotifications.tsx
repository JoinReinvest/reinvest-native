import messaging from '@react-native-firebase/messaging';
import { useEffect, useState } from 'react';
import { useRegisterPushNotificationDevices } from 'reinvest-app-common/src/services/queries/registerDeviceForPushNotificatinos';

import { getApiClient } from '../api/getApiClient';
import { checkPermissionsAndGetToken, handleNotification } from '../services/push.service';

export const usePushNotifications = () => {
  const [FCMToken, setFCMToken] = useState<string | null>(null);
  const { mutateAsync: registerPushNotificationDevices } = useRegisterPushNotificationDevices(getApiClient);
  useEffect(() => {
    if (!FCMToken) {
      return;
    }

    const unsubscribe = messaging().onMessage(message => {
      handleNotification(message);
    });

    return () => {
      unsubscribe();
    };
  }, [FCMToken]);

  useEffect(() => {
    (async () => {
      const token = await checkPermissionsAndGetToken(async deviceToken => {
        await registerPushNotificationDevices({ deviceId: deviceToken });
      });
      console.log('TOKEN: ', token);
      setFCMToken(token);
    })();
  }, [registerPushNotificationDevices]);

  return { FCMToken, hasPermissions: !!FCMToken };
};
