import { FlashList } from '@shopify/flash-list';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetAccountActivity } from 'reinvest-app-common/src/services/queries/getAccountActivity';
import { AccountActivity as AccountActivityT } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { getApiClient } from '../../../../api/getApiClient';
import { Box } from '../../../../components/Containers/Box/Box';
import { Row } from '../../../../components/Containers/Row';
import { EmptyListComponent } from '../../../../components/EmptyList';
import { Icon } from '../../../../components/Icon';
import { MainWrapper } from '../../../../components/MainWrapper';
import { StyledText } from '../../../../components/typography/StyledText';
import { palette } from '../../../../constants/theme';
import { useCurrentAccount } from '../../../../hooks/useActiveAccount';
import { useLogInNavigation } from '../../../../navigation/hooks';
import Screens from '../../../../navigation/screens';

export const AccountActivity = () => {
  const { activeAccount } = useCurrentAccount();
  const { top } = useSafeAreaInsets();
  const { data, isLoading, refetch, fetchNextPage } = useGetAccountActivity(getApiClient, {
    accountId: activeAccount.id ?? '',
    config: { enabled: !!activeAccount.id },
  });

  const list = useMemo(() => data?.pages.flat() || [], [data]);

  return (
    <MainWrapper isLoading={isLoading}>
      <Box
        fw
        flex={1}
      >
        <FlashList<AccountActivityT>
          data={list as AccountActivityT[]}
          ListEmptyComponent={!isLoading ? <EmptyListComponent headline="No activity" /> : null}
          refreshing={isLoading}
          estimatedItemSize={76}
          onRefresh={refetch}
          keyExtractor={(item, index) => `${+dayjs(item.date).toDate()}${index}`}
          onEndReached={() => fetchNextPage()}
          onEndReachedThreshold={0.3}
          contentContainerStyle={{ paddingTop: top }}
          renderItem={({ item }) => <AccountActivityItem activity={item} />}
        />
      </Box>
    </MainWrapper>
  );
};
const AccountActivityItem = ({ activity }: { activity: AccountActivityT }) => {
  const { navigate } = useLogInNavigation();

  const { activityName, date } = activity;

  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: palette.lightGray,
      }}
      onPress={() => navigate(Screens.AccountActivityDetails, { activity })}
    >
      <Box>
        <Row mb="4">
          <StyledText variant="paragraphEmp">{activityName}</StyledText>
        </Row>
        <StyledText variant="paragraph">{formatDate(date, 'ACCOUNT_ACTIVITY', { currentFormat: 'API_TZ' })}</StyledText>
      </Box>
      <Icon icon="arrowRight" />
    </Pressable>
  );
};
