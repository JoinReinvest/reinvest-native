import { FlashList } from '@shopify/flash-list';
import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import React, { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetNotifications } from 'reinvest-app-common/src/services/queries/getNotifications';
import { GetApiClient } from 'reinvest-app-common/src/services/queries/interfaces';
import { useMarkNotificationAsRead } from 'reinvest-app-common/src/services/queries/markNotificationAsRead';
import { useVerifyAccount } from 'reinvest-app-common/src/services/queries/verifyAccount';
import { Notification as BaseNotification, NotificationType, Query, VerificationAction } from 'reinvest-app-common/src/types/graphql';

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
  const { data, isLoading, isRefetching, refetch, fetchNextPage } = useGetNotifications(getApiClient, {
    accountId: activeAccount.id || '',
  });
  const { mutateAsync: verifyAccount } = useVerifyAccount(getApiClient);
  const setUnreadNotificationsCount = useSetAtom(unreadNotificationsCount);
  const { mutateAsync: markRead } = useMarkNotificationAsRead(getApiClient);

  const list = data?.pages.map(el => el.getNotifications).flat() ?? [];

  const onPressHandler = async (notification: BaseNotification) => {
    if (notification.isRead) {
      return;
    }

    await markRead({ notificationId: notification.id });
    await refetch();

    switch (notification.notificationType) {
      case NotificationType.RecurringInvestmentFailed:
        return navigate(Screens.ManageAccount, { options: { identifier: NavigationIdentifiers.RECURRING_INVESTMENT, label: 'Recurring Investment' } });
      case NotificationType.InvestmentFailed:
        return navigate(Screens.ManageAccount, { options: { identifier: NavigationIdentifiers.BANK_ACCOUNT, label: 'Bank Account' } });
      case NotificationType.VerificationFailed: {
        const verificationResponse = await verifyAccount({ accountId: activeAccount.id ?? '' });

        return navigate(Screens.KYCFail, { actions: verificationResponse?.requiredActions as VerificationAction[] });
      }
      case NotificationType.FeesApprovalRequired: {
        return navigate(Screens.FeesApproval, { investmentId: notification.onObject?.id ?? '' });
      }
      case NotificationType.DividendReceived:
      case NotificationType.RewardDividendReceived:
        return navigate(Screens.NotificationDetails, { notification });
      default: {
        return;
      }
    }
  };

  useEffect(() => {
    (async () => {
      const res = await refetch();

      if (res.data?.pages.length) {
        setUnreadNotificationsCount(res.data.pages[0]?.unreadCount ?? 0);
      }
    })();
  }, [refetch, setUnreadNotificationsCount]);

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
          ListEmptyComponent={!isLoading && !list.length ? <EmptyListComponent headline="No Notifications" /> : null}
          estimatedItemSize={132}
          refreshing={isLoading || isRefetching}
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
