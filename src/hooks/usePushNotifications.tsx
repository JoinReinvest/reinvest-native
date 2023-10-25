import messaging from '@react-native-firebase/messaging';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useGetNotifications } from 'reinvest-app-common/src/services/queries/getNotifications';
import { useRegisterPushNotificationDevices } from 'reinvest-app-common/src/services/queries/registerDeviceForPushNotificatinos';

import { getApiClient } from '../api/getApiClient';
import { checkPermissionsAndGetToken, handleNotification } from '../services/push.service';
import { unreadNotificationsCount } from '../store/atoms';
import { useCurrentAccount } from './useActiveAccount';

export const usePushNotifications = () => {
  const [FCMToken, setFCMToken] = useState<string | null>(null);
  const { activeAccount } = useCurrentAccount();
  const setUnreadNotifications = useSetAtom(unreadNotificationsCount);
  const { mutateAsync: registerPushNotificationDevices } = useRegisterPushNotificationDevices(getApiClient);
  const { refetch } = useGetNotifications(getApiClient, { accountId: activeAccount.id ?? '' });
  useEffect(() => {
    if (!FCMToken) {
      return;
    }

    const unsubscribe = messaging().onMessage(async message => {
      const { data } = await refetch();

      if (data?.pages.length && data.pages[0]?.unreadCount) {
        setUnreadNotifications(data.pages[0].unreadCount);
      }

      handleNotification(message);
    });

    return () => {
      unsubscribe();
    };
  }, [FCMToken, refetch, setUnreadNotifications]);

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
