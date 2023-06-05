import React from 'react';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';

import { getApiClient } from '../../../../api/getApiClient';
import { UpdateNameFlowProvider } from './steps';
import { UpdateNameLayout } from './UpdateNameLayout';

export const UpdateName = () => {
  const { data: userProfile } = useGetUserProfile(getApiClient);

  return (
    <UpdateNameFlowProvider
      initialStoreFields={{
        firstName: userProfile?.details?.firstName ?? '',
        middleName: userProfile?.details?.middleName ?? '',
        lastName: userProfile?.details?.lastName ?? '',
        identificationDocument: [],
      }}
    >
      <UpdateNameLayout />
    </UpdateNameFlowProvider>
  );
};
