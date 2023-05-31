import React from 'react';

import { UpdateEmailFlowProvider } from './steps';
import { UpdatePasswordLayout } from './UpdatePasswordLayout';

export const UpdatePassword = () => {
  return (
    <UpdateEmailFlowProvider
      initialStoreFields={{
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      }}
    >
      <UpdatePasswordLayout />
    </UpdateEmailFlowProvider>
  );
};
