import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetNotDismissedNotifications } from 'reinvest-app-common/src/services/queries/getNotDimissedNotifications';
import { useMarkNotificationAsRead } from 'reinvest-app-common/src/services/queries/markNotificationAsRead';
import { Notification as BaseNotification } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../api/getApiClient';
import { Box } from '../../components/Containers/Box/Box';
import { ContainerOverlay } from '../../components/Containers/ContainerOverlay';
import { Icon } from '../../components/Icon';
import { Loader } from '../../components/Loader';
import { MainWrapper } from '../../components/MainWrapper';
import { Notification } from '../../components/Notification';
import { StyledText } from '../../components/typography/StyledText';
import { palette } from '../../constants/theme';
import { useCurrentAccount } from '../../hooks/useActiveAccount';
import { useLogInNavigation } from '../../navigation/hooks';
import Screens from '../../navigation/screens';

export const Notifications = () => {
  const { top } = useSafeAreaInsets();
  const [page, setPage] = useState(0);
  const { activeAccount } = useCurrentAccount();
  const { navigate } = useLogInNavigation();
  const { data, isLoading, refetch } = useGetNotDismissedNotifications(getApiClient, {
    accountId: activeAccount.id || '',
    pagination: { page, perPage: 10 },
  });
  const { mutate: markRead } = useMarkNotificationAsRead(getApiClient);

  const onPressHandler = (notification: BaseNotification) => {
    if (notification.isDismissible) {
      markRead({ notificationId: notification.id });
    }

    navigate(Screens.NotificationDetails, { notification });
  };

  if (isLoading) {
    return (
      <ContainerOverlay>
        <Loader color={palette.deepGreen} />
      </ContainerOverlay>
    );
  }

  return (
    <MainWrapper
      noPadding
      isLoading={isLoading}
    >
      {data && (
        <FlatList<BaseNotification>
          refreshing={isLoading}
          onRefresh={refetch}
          contentContainerStyle={{ maxWidth: '100%', paddingTop: top }}
          data={data as BaseNotification[]}
          keyExtractor={(item: BaseNotification) => item.id}
          renderItem={({ item }) => (
            <Notification
              onPress={() => onPressHandler(item)}
              key={item.id}
              {...item}
            />
          )}
        />
      )}
      {!data && (
        <Box
          mt="24"
          fw
          px="default"
        >
          <Icon icon="info" />
          <StyledText variant="h6">No Notifications</StyledText>
        </Box>
      )}
    </MainWrapper>
  );
};
