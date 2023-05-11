import React from 'react';

import { LogInProps } from '../../navigation/LogInNavigator/types';
import Screens from '../../navigation/screens';
import { currentAccount, useAtom } from '../../store/atoms';
import { BlackLayout } from './BlackLayout';
import { initialKYCFailedFormFields, KYCFailedFormFlowProvider } from './flow-steps';

export const KYCFail = ({ route: { params } }: LogInProps<Screens.KYCFail>) => {
  const [account] = useAtom(currentAccount);

  return (
    <KYCFailedFormFlowProvider
      initialStoreFields={{
        ...initialKYCFailedFormFields,
        _actions: params.actions,
        accountId: account?.id || '',
      }}
    >
      <BlackLayout shouldShowFooter={false} />
    </KYCFailedFormFlowProvider>
  );
};
