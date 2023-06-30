import React from 'react';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';

import { getApiClient } from '../../../../api/getApiClient';
import { UpdateDomicileFlowProvider } from './steps';
import { UpdateDomicileLayout } from './UpdateDomicileLayout';

export const UpdateDomicile = () => {
  const { data: userProfile } = useGetUserProfile(getApiClient);

  if (!userProfile?.details?.domicile) {
    return null;
  }

  return (
    <UpdateDomicileFlowProvider initialStoreFields={userProfile.details.domicile}>
      <UpdateDomicileLayout />
    </UpdateDomicileFlowProvider>
  );
};
