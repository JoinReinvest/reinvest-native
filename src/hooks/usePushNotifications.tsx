import messaging from '@react-native-firebase/messaging';
import { useEffect, useState } from 'react';

import { checkPermissionsAndGetToken, handleNotification } from '../services/push.service';

export const usePushNotifications = () => {
  const [FCMToken, setFCMToken] = useState<string | null>(null);
  useEffect(() => {
    if (FCMToken) {
      messaging().onMessage(message => {
        handleNotification(message);
      });
    }
  }, [FCMToken]);

  useEffect(() => {
    (async () => {
      const token = await checkPermissionsAndGetToken();
      setFCMToken(token);
    })();
  }, []);

  return { FCMToken, hasPermissions: !!FCMToken };
};
