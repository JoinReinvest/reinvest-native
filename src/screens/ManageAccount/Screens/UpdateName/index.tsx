import React from 'react';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';

import { getApiClient } from '../../../../api/getApiClient';
import { MainWrapper } from '../../../../components/MainWrapper';
import { UpdateNameFlowProvider } from './steps';
import { UpdateNameLayout } from './UpdateNameLayout';

export const UpdateName = () => {
  const { data: userProfile } = useGetUserProfile(getApiClient);

  if (!userProfile?.details?.domicile) {
    return <MainWrapper isLoading={true} />;
  }

  return (
    <UpdateNameFlowProvider
      initialStoreFields={{
        firstName: userProfile.details.firstName ?? '',
        middleName: userProfile.details.middleName ?? '',
        lastName: userProfile.details.lastName ?? '',
        identificationDocument: [],
      }}
    >
      <UpdateNameLayout />
    </UpdateNameFlowProvider>
  );
};
