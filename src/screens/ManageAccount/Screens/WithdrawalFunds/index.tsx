import React from 'react';
import { useGetAccountStats } from 'reinvest-app-common/src/services/queries/getAccountStats';

import { getApiClient } from '../../../../api/getApiClient';
import { useCurrentAccount } from '../../../../hooks/useActiveAccount';
import { WithdrawalFundsFormFields } from './form-fields';
import { WithdrawalFundsFlowProvider } from './steps';
import { WithdrawalFundsLayout } from './WithdrawalFundsLayout';

export const WithdrawalFunds = () => {
  const { activeAccount } = useCurrentAccount();
  const { data: stats } = useGetAccountStats(getApiClient, { accountId: activeAccount.id ?? '', config: { enabled: !!activeAccount.id } });

  const initialStoreFields: WithdrawalFundsFormFields = {
    reason: '',
    isAgreementAccepted: false,
    _accountValue: stats?.accountValue,
  };

  return (
    <WithdrawalFundsFlowProvider initialStoreFields={initialStoreFields}>
      <WithdrawalFundsLayout />
    </WithdrawalFundsFlowProvider>
  );
};
