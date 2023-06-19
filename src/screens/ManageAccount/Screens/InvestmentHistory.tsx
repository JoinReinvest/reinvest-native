import { FlashList } from '@shopify/flash-list';
import React, { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useListInvestments } from 'reinvest-app-common/src/services/queries/list-investments';
import { InvestmentOverview } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { Box } from '../../../components/Containers/Box/Box';
import { Row } from '../../../components/Containers/Row';
import { Icon } from '../../../components/Icon';
import { StyledText } from '../../../components/typography/StyledText';
import { palette } from '../../../constants/theme';
import { useCurrentAccount } from '../../../hooks/useActiveAccount';
import { InvestmentItem } from '../components/investmentItem';

export const InvestmentHistory = () => {
  const { activeAccount } = useCurrentAccount();
  const { top } = useSafeAreaInsets();
  const { data, isLoading, refetch, fetchNextPage } = useListInvestments(getApiClient, {
    accountId: activeAccount.id ?? '',
    config: { enabled: !!activeAccount.id },
  });

  const list = useMemo(() => data?.pages.flat() || [], [data]);

  return (
    <Box
      pt="24"
      pl="24"
      pr="16"
      style={{ backgroundColor: palette.pureWhite }}
      fw
      flex={1}
    >
      <FlashList<InvestmentOverview>
        data={list as InvestmentOverview[]}
        ListEmptyComponent={!isLoading ? <EmptyListComponent /> : null}
        refreshing={isLoading}
        estimatedItemSize={132}
        onRefresh={refetch}
        keyExtractor={item => item.id}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={0.3}
        contentContainerStyle={{ paddingTop: top }}
        renderItem={({ item }) => <InvestmentItem {...item} />}
      />
    </Box>
  );
};

const EmptyListComponent = () => {
  return (
    <Row
      mt="24"
      fw
      px="default"
      alignItems="center"
    >
      <Icon icon="info" />
      <StyledText variant="h6">No investments</StyledText>
    </Row>
  );
};
