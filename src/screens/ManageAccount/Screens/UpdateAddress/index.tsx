import React from 'react';

import { UpdateAddressFlowProvider } from './steps';
import { UpdateAddressLayout } from './UpdateAddressLayout';

export const Address = () => {
  return (
    <UpdateAddressFlowProvider initialStoreFields={{}}>
      <UpdateAddressLayout />
    </UpdateAddressFlowProvider>
  );
};
