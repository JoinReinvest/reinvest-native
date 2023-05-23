import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { LogInStackParamList } from '../../navigation/LogInNavigator/types';
import Screens from '../../navigation/screens';
import { currentAccount, useAtom } from '../../store/atoms';
import { BankAccountLayout } from './BankAccountLayout';
import { BankAccountFlowProvider, bankAccountInitialSteps } from './flow-steps';

export const BankAccount = ({ route }: NativeStackScreenProps<LogInStackParamList, Screens.BankAccount>) => {
  const [account] = useAtom(currentAccount);
  const { sourceScreen, isUpdatingAccount, accountId } = route.params;

  return (
    <BankAccountFlowProvider
      initialStoreFields={{
        ...bankAccountInitialSteps,
        sourceScreen,
        isUpdatingAccount,
        accountId: accountId || account.id || '',
      }}
    >
      <BankAccountLayout shouldShowFooter={false} />
    </BankAccountFlowProvider>
  );
};
