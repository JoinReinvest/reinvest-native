import React from 'react';

import { UpdatePhoneNumberFlowProvider } from './steps';
import { UpdatePhoneNumberLayout } from './UpdatePhoneNumberLayout';

export const UpdatePhoneNumber = () => {
  return (
    <UpdatePhoneNumberFlowProvider
      initialStoreFields={{
        phoneNumber: '',
        countryCode: '',
      }}
    >
      <UpdatePhoneNumberLayout />
    </UpdatePhoneNumberFlowProvider>
  );
};
