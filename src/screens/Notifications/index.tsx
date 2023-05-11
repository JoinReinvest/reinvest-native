import React from 'react';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MainWrapper } from '../../components/MainWrapper';
import { Notification } from '../../components/Notification';

// TODO: Fetch notifications from API when query will be implemented

const notifications = [
  {
    id: '0',
    title: 'Dividend Update',
    content: 'You earned $10 in dividends. Reinvest or withdraw your dividend.',
    date: '2023-05-10',
  },
  {
    id: '1',
    title: 'Referral Reward',
    content: 'You earned $10 for inviting friends and family. Reinvest or withdraw your reward.',
    date: '2023-05-09',
  },
];

export const Notifications = () => {
  const { top } = useSafeAreaInsets();

  return (
    <MainWrapper style={{ paddingTop: top, paddingHorizontal: 0, rowGap: 8 }}>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          {...notification}
          onPress={() => Alert.alert('Navigate to somewhere')}
        />
      ))}
    </MainWrapper>
  );
};
