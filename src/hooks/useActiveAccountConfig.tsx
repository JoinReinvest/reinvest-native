import { useGetAccountConfiguration } from 'reinvest-app-common/src/services/queries/getAccountConfiguration';

import { getApiClient } from '../api/getApiClient';
import { useCurrentAccount } from './useActiveAccount';

export const useCurrentAccountConfig = () => {
  const { activeAccount } = useCurrentAccount();
  const {
    data: accountConfig,
    refetch,
    isLoading,
  } = useGetAccountConfiguration(getApiClient, {
    accountId: activeAccount.id || '',
    config: { enabled: !!activeAccount.id?.length },
  });

  return { activeAccount, accountConfig, isLoading, refetch };
};
