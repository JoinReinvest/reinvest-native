import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import React, { useEffect, useMemo } from 'react';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetNotifications } from 'reinvest-app-common/src/services/queries/getNotifications';
import { GetApiClient } from 'reinvest-app-common/src/services/queries/interfaces';
import { useMarkNotificationAsRead } from 'reinvest-app-common/src/services/queries/markNotificationAsRead';
import { Notification as BaseNotification, Query } from 'reinvest-app-common/src/types/graphql';
import { unreadNotificationsCount } from 'store/atoms';

import { getApiClient } from '../../api/getApiClient';
import { queryClient } from '../../App';
import { Row } from '../../components/Containers/Row';
import { Icon } from '../../components/Icon';
import { MainWrapper } from '../../components/MainWrapper';
import { Notification } from '../../components/Notification';
import { StyledText } from '../../components/typography/StyledText';
import { useCurrentAccount } from '../../hooks/useActiveAccount';
import { useLogInNavigation } from '../../navigation/hooks';
import Screens from '../../navigation/screens';
import { styles } from './styles';

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

  const onPressHandler = (notification: BaseNotification) => {
    if (notification.isDismissible) {
      markRead({ notificationId: notification.id });
      queryClient.invalidateQueries(['getNotifications']);
    }

    navigate(Screens.NotificationDetails, { notification });
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
      <FlatList<BaseNotification>
        ListEmptyComponent={
          !isLoading ? (
            <Row
              mt="24"
              fw
              px="default"
              alignItems="center"
            >
              <Icon icon="info" />
              <StyledText variant="h6">No Notifications</StyledText>
            </Row>
          ) : null
        }
        refreshing={isLoading}
        onRefresh={refetch}
        initialNumToRender={2}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={0.3}
        style={styles.container}
        contentContainerStyle={[styles.contentContainer, { paddingTop: top }]}
        data={list as BaseNotification[]}
        keyExtractor={(item: BaseNotification) => item.id}
        renderItem={({ item }) => (
          <Notification
            onPress={() => onPressHandler(item)}
            key={item.id}
            {...item}
          />
        )}
      />
    </MainWrapper>
  );
};
