import { FlashList } from '@shopify/flash-list';
import React, { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useListInvestments } from 'reinvest-app-common/src/services/queries/list-investments';
import { InvestmentOverview } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { Box } from '../../../components/Containers/Box/Box';
import { EmptyListComponent } from '../../../components/EmptyList';
import { MainWrapper } from '../../../components/MainWrapper';
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
    <MainWrapper
      isLoading={isLoading}
      noPadding
    >
      <Box
        style={{ backgroundColor: palette.pureWhite }}
        fw
        flex={1}
        px="default"
      >
        <FlashList<InvestmentOverview>
          data={list as InvestmentOverview[]}
          ListEmptyComponent={!isLoading ? <EmptyListComponent headline="No investments" /> : null}
          refreshing={isLoading}
          estimatedItemSize={132}
          onRefresh={refetch}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          onEndReached={() => fetchNextPage()}
          onEndReachedThreshold={0.3}
          contentContainerStyle={{ paddingTop: top }}
          renderItem={({ item }) => <InvestmentItem {...item} />}
        />
      </Box>
    </MainWrapper>
  );
};
