import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useGetAccountsOverview } from 'reinvest-app-common/src/services/queries/getAccountsOverview';

import { getApiClient } from '../../api/getApiClient';
import { useCurrentAccount } from '../../hooks/useActiveAccount';
import { LogInStackParamList } from '../../navigation/LogInNavigator/types';
import Screens from '../../navigation/screens';
import { InvestFormFlowProvider, investingFormFieldsInitialState } from './flow-steps';
import { InvestmentLayout } from './InvestmentLayout';

export const Investing = ({ route }: NativeStackScreenProps<LogInStackParamList, Screens.Investing>) => {
  const { initialInvestment, bankAccount, accountId: idFromNavParams, skipOneTimeInvestment = false } = route.params || {};

  const { activeAccount } = useCurrentAccount();
  const { data: accounts } = useGetAccountsOverview(getApiClient);

  const account = accounts?.find(account => account?.id === idFromNavParams) || activeAccount;

  return (
    <InvestFormFlowProvider
      initialStoreFields={{
        ...investingFormFieldsInitialState,
        initialInvestment,
        accountId: account.id || '',
        accountType: account.type,
        accountSelectable: !!(accounts && accounts?.length > 1),
        skipOneTimeInvestment,
        bankAccount,
      }}
    >
      {accounts && (
        <InvestmentLayout
          isSingleAccount={!(accounts.length > 1)}
          initialInvestment={initialInvestment}
          shouldShowFooter={false}
        />
      )}
    </InvestFormFlowProvider>
  );
};
