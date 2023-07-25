/* eslint-disable no-console */

import messaging, { type FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { Permission, PermissionsAndroid, Platform } from 'react-native';

type PushHandlers = Record<string, (notification?: FirebaseMessagingTypes.NotificationPayload) => void>;

const MessagingService = {
  async requestUserPermission(): Promise<boolean> {
    const authorizationStatus = await messaging().requestPermission();

    if (Platform.OS === 'android') {
      setTimeout(() => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS as Permission);
      }, 500);
    }

    return authorizationStatus === 1 || authorizationStatus === 2 || authorizationStatus === 3;
  },

  async getFCMToken(): Promise<string> {
    return messaging().getToken();
  },
};

export const checkPermissionsAndGetToken = async (onSuccess: (deviceToken: string) => Promise<void>) => {
  const arePushNotificationsGranted = await MessagingService.requestUserPermission();

  if (arePushNotificationsGranted) {
    const FCMToken = await MessagingService.getFCMToken();

    onSuccess(FCMToken);

    return FCMToken;
  }

  return null;
};

const messageTypeHandlers = {
  fallback: notification => {
    console.log(notification);
  },
  investment: notification => {
    console.log('Investment notification', notification);
  },
} as PushHandlers;

export const handleNotification = ({ messageType, notification }: FirebaseMessagingTypes.RemoteMessage) => {
  if (messageType && messageType in messageTypeHandlers) {
    return messageTypeHandlers[messageType as keyof PushHandlers]?.(notification);
  }

  return console.log(notification, messageType);
};
