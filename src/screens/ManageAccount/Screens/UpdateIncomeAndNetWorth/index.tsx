import React from 'react';
import { useGetIndividualAccount } from 'reinvest-app-common/src/services/queries/getIndividualAccount';

import { getApiClient } from '../../../../api/getApiClient';
import { MainWrapper } from '../../../../components/MainWrapper';
import { UpdateIncomeAndNetWorthFlowProvider } from './steps';
import { UpdateIncomeAndNetWorthLayout } from './UpdateIncomeAndNetLayout';

export const UpdateIncomeAndNetWorth = () => {
  const { data: individualAccount } = useGetIndividualAccount(getApiClient);

  if (!individualAccount) {
    return <MainWrapper isLoading={true} />;
  }

  return (
    <UpdateIncomeAndNetWorthFlowProvider
      initialStoreFields={{
        originalNetIncome: individualAccount?.details?.netIncome?.range ?? '',
        originalNetWorth: individualAccount?.details?.netWorth?.range ?? '',
      }}
    >
      <UpdateIncomeAndNetWorthLayout />
    </UpdateIncomeAndNetWorthFlowProvider>
  );
};
