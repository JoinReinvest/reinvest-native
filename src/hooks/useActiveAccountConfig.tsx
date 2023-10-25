import { useGetAccountConfiguration } from 'reinvest-app-common/src/services/queries/getAccountConfiguration';

import { getApiClient } from '../api/getApiClient';
import { useCurrentAccount } from './useActiveAccount';

export const useCurrentAccountConfig = (accountId?: string) => {
  const { activeAccount } = useCurrentAccount();
  const {
    data: accountConfig,
    refetch,
    isLoading,
  } = useGetAccountConfiguration(getApiClient, {
    accountId: accountId || activeAccount.id || '',
    config: { enabled: !!accountId || !!activeAccount.id?.length },
  });

  return { activeAccount, accountConfig, isLoading, refetch, connectedAccountId: accountId || activeAccount.id };
};
