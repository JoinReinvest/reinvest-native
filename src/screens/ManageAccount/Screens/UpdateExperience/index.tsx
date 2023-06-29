import React from 'react';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';

import { getApiClient } from '../../../../api/getApiClient';
import { UpdateExperienceFlowProvider } from './steps';
import { UpdateExperienceLayout } from './UpdateExperienceLayout';

export const UpdateExperience = () => {
  const { data: userProfile } = useGetUserProfile(getApiClient);

  return (
    <UpdateExperienceFlowProvider
      initialStoreFields={{
        originalExperience: userProfile?.details?.experience ?? null,
        updatedExperience: null,
      }}
    >
      <UpdateExperienceLayout />
    </UpdateExperienceFlowProvider>
  );
};
