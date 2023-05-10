import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { LogInStackParamList } from '../../navigation/LogInNavigator/types';
import Screens from '../../navigation/screens';
import { currentAccount, useAtom } from '../../store/atoms';
import { InvestFormFlowProvider, investingFormFieldsInitialState } from './flow-steps';
import { InvestmentLayout } from './InvestmentLayout';

export const Investing = ({ route }: NativeStackScreenProps<LogInStackParamList, Screens.Investing>) => {
  const [account] = useAtom(currentAccount);
  const { initialInvestment } = route.params || {};

  return (
    <InvestFormFlowProvider
      initialStoreFields={{
        ...investingFormFieldsInitialState,
        initialInvestment,
        accountId: account?.id || '',
      }}
    >
      <InvestmentLayout
        initialInvestment={initialInvestment}
        shouldShowFooter={false}
      />
    </InvestFormFlowProvider>
  );
};
