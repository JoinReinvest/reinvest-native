import React from 'react';

import { currentAccount, useAtom } from '../../store/atoms';
import { InvestFormFlowProvider, investingFormFieldsInitialState } from './flow-steps';
import { InvestmentLayout } from './InvestmentLayout';

export const Investing = () => {
  const [account] = useAtom(currentAccount);

  return (
    <InvestFormFlowProvider
      initialStoreFields={{
        ...investingFormFieldsInitialState,
        accountId: account?.id || '',
      }}
    >
      <InvestmentLayout shouldShowFooter={false} />
    </InvestFormFlowProvider>
  );
};
