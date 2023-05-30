import React from 'react';

import { UpdateEmailFlowProvider } from './steps';
import { UpdateEmailLayout } from './UpdateEmailLayout';

export const UpdateEmail = () => {
  return (
    <UpdateEmailFlowProvider
      initialStoreFields={{
        email: '',
      }}
    >
      <UpdateEmailLayout />
    </UpdateEmailFlowProvider>
  );
};
