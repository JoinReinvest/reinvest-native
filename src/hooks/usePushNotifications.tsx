import messaging from '@react-native-firebase/messaging';
import { useEffect, useState } from 'react';
import { useRegisterPushNotificationDevices } from 'reinvest-app-common/src/services/queries/registerDeviceForPushNotificatinos';

import { getApiClient } from '../api/getApiClient';
import { checkPermissionsAndGetToken, handleNotification } from '../services/push.service';

export const usePushNotifications = () => {
  const [FCMToken, setFCMToken] = useState<string | null>(null);
  const { mutateAsync: registerPushNotificationDevices } = useRegisterPushNotificationDevices(getApiClient);
  useEffect(() => {
    if (FCMToken) {
      messaging().onMessage(message => {
        handleNotification(message);
      });
    }
  }, [FCMToken]);

  useEffect(() => {
    (async () => {
      const token = await checkPermissionsAndGetToken(async deviceToken => {
        await registerPushNotificationDevices({ deviceId: deviceToken });
      });
      setFCMToken(token);
    })();
  }, [registerPushNotificationDevices]);

  return { FCMToken, hasPermissions: !!FCMToken };
};
