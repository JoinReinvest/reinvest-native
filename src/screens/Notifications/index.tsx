import React from 'react';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Notification as BaseNotification } from 'reinvest-app-common/src/types/graphql';

import { Box } from '../../components/Containers/Box/Box';
import { Icon } from '../../components/Icon';
import { MainWrapper } from '../../components/MainWrapper';
import { Notification } from '../../components/Notification';
import { StyledText } from '../../components/typography/StyledText';
import { styles } from './styles';

// TODO: Fetch notifications from API

const notifications: (Partial<BaseNotification> & { id: string })[] = [
  {
    id: '0',
    header: 'Referral Reward Update',
    body: '{{$10}} in referral reward credit has been transferred to your bank account. Please expect to see it deposited within 3–5 business days.',
    date: '2023-05-15',
    isRead: false,
  },
  {
    id: '1',
    header: 'Dividend Update',
    body: 'You earned $10 in dividends. Reinvest or withdraw your dividend.',
    date: '2023-05-10',
    isRead: true,
  },
  {
    id: '2',
    header: 'Investment failed',
    body: "Your recent investment [trade ID] failed. We'll try to process payment again over the next few days. To process investment, you may need to update your billing details.",
    date: '2023-05-09',
    isRead: false,
  },
  {
    id: '3',
    header: 'Dividends Payout',
    body: 'Congrats! You have received a {{$30}} dividend payout in your bank account. Funds should appear within 3–5 business days.',
    date: '2023-05-08',
    isRead: false,
  },
];

export const Notifications = () => {
  const { top } = useSafeAreaInsets();

  return (
    <MainWrapper
      isScroll
      style={{ paddingTop: top }}
      contentContainerStyle={{ paddingHorizontal: 0 }}
    >
      <Box
        px="default"
        py="24"
        fw
        style={styles.notificationHeaderContainer}
      >
        <StyledText variant="h3">Notifications</StyledText>
      </Box>
      {notifications.length ? (
        notifications.map(notification => (
          <Notification
            onPress={id => Alert.alert(`Notification ${id} clicked: Navigate to somewhere`)}
            key={notification.id}
            {...notification}
          />
        ))
      ) : (
        <Box
          mt="24"
          fw
          px="default"
          style={styles.noNotificationContainer}
        >
          <Icon icon="info" />
          <StyledText variant="h6">No Notifications</StyledText>
        </Box>
      )}
    </MainWrapper>
  );
};
