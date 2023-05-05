import React from 'react';

import { InvestFormFlowProvider, onBoardingFormFieldsInitialState } from './flow-steps';
import { InvestmentLayout } from './InvestmentLayout';

export const Investing = () => {
  return (
    <InvestFormFlowProvider
      initialStoreFields={{
        ...onBoardingFormFieldsInitialState,
      }}
    >
      <InvestmentLayout />
    </InvestFormFlowProvider>
  );
};
