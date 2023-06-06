import React from 'react';

import { WithdrawalFundsFlowProvider } from './steps';
import { WithdrawalFundsLayout } from './WithdrawalFundsLayout';

export const WithdrawalFunds = () => {
  return (
    <WithdrawalFundsFlowProvider
      initialStoreFields={{
        reason: '',
        isAgreementAccepted: false,
      }}
    >
      <WithdrawalFundsLayout />
    </WithdrawalFundsFlowProvider>
  );
};
