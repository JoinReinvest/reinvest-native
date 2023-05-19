import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { useCurrentAccountConfig } from '../../hooks/useActiveAccountConfig';
import { LogInStackParamList } from '../../navigation/LogInNavigator/types';
import Screens from '../../navigation/screens';
import { InvestFormFlowProvider, investingFormFieldsInitialState } from './flow-steps';
import { InvestmentLayout } from './InvestmentLayout';

export const Investing = ({ route }: NativeStackScreenProps<LogInStackParamList, Screens.Investing>) => {
  // const { activeAccount } = useCurrentAccount();
  const { activeAccount, accountConfig } = useCurrentAccountConfig();
  const { initialInvestment, bankAccount } = route.params || {};

  return (
    <InvestFormFlowProvider
      initialStoreFields={{
        ...investingFormFieldsInitialState,
        initialInvestment,
        accountId: activeAccount?.id || '',
        automaticDividendReinvestmentAgreement: accountConfig?.automaticDividendReinvestmentAgreement.signed,
        bankAccount,
      }}
    >
      <InvestmentLayout
        initialInvestment={initialInvestment}
        shouldShowFooter={false}
      />
    </InvestFormFlowProvider>
  );
};
