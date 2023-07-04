import { FlashList } from '@shopify/flash-list';
import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import React, { useEffect, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetNotifications } from 'reinvest-app-common/src/services/queries/getNotifications';
import { GetApiClient } from 'reinvest-app-common/src/services/queries/interfaces';
import { useMarkNotificationAsRead } from 'reinvest-app-common/src/services/queries/markNotificationAsRead';
import { Notification as BaseNotification, NotificationType, Query } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../api/getApiClient';
import { Box } from '../../components/Containers/Box/Box';
import { EmptyListComponent } from '../../components/EmptyList';
import { MainWrapper } from '../../components/MainWrapper';
import { Notification } from '../../components/Notification';
import { useCurrentAccount } from '../../hooks/useActiveAccount';
import { useLogInNavigation } from '../../navigation/hooks';
import Screens from '../../navigation/screens';
import { unreadNotificationsCount } from '../../store/atoms';
import { NavigationIdentifiers } from '../ManageAccount/navigationLinks';
import { ACTIONABLE_NOTIFICATIONS } from './constants';

export type UseApiQuery<QueryKey extends keyof Query> = (getClient: GetApiClient) => UseInfiniteQueryResult<Query[QueryKey]>;

export const Notifications = () => {
  const { top } = useSafeAreaInsets();
  const { activeAccount } = useCurrentAccount();
  const { navigate } = useLogInNavigation();
  const { data, isLoading, refetch, fetchNextPage } = useGetNotifications(getApiClient, {
    accountId: activeAccount.id || '',
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setUnreadNotificationsCount] = useAtom(unreadNotificationsCount);
  const { mutate: markRead } = useMarkNotificationAsRead(getApiClient);

  const list = useMemo(() => data?.pages.map(el => el.getNotifications).flat() || [], [data]);

  const onPressHandler = async (notification: BaseNotification) => {
    if (notification.isRead) {
      return;
    }

    markRead({ notificationId: notification.id });
    await refetch();

    switch (notification.notificationType) {
      case NotificationType.RecurringInvestmentFailed:
        return navigate(Screens.ManageAccount, { options: { identifier: NavigationIdentifiers.RECURRING_INVESTMENT, label: 'Recurring Investment' } });
      case NotificationType.InvestmentFailed:
        return navigate(Screens.ManageAccount, { options: { identifier: NavigationIdentifiers.BANK_ACCOUNT, label: 'Bank Account' } });
      case NotificationType.DividendReceived:
      case NotificationType.RewardDividendReceived:
        return navigate(Screens.NotificationDetails, { notification });
      default: {
        return;
      }
    }
  };

  useEffect(() => {
    if (data) {
      setUnreadNotificationsCount(data.pages[0]?.unreadCount ?? 0);
    }
  }, [data, setUnreadNotificationsCount]);

  return (
    <MainWrapper
      isLoading={isLoading}
      noPadding
    >
      <Box
        fw
        flex={1}
      >
        <FlashList<BaseNotification>
          ListEmptyComponent={!isLoading ? <EmptyListComponent headline="No Notifications" /> : null}
          estimatedItemSize={132}
          refreshing={isLoading}
          onRefresh={refetch}
          onEndReached={() => fetchNextPage()}
          onEndReachedThreshold={0.3}
          contentContainerStyle={{ paddingTop: top }}
          data={list as BaseNotification[]}
          keyExtractor={(item: BaseNotification) => item.id}
          renderItem={({ item }) => (
            <Notification
              onPress={() => onPressHandler(item)}
              key={item.id}
              showIcon={ACTIONABLE_NOTIFICATIONS.includes(item.notificationType)}
              {...item}
            />
          )}
        />
      </Box>
    </MainWrapper>
  );
};
