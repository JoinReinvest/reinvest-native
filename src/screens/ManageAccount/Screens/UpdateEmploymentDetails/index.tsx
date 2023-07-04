import React from 'react';
import { useGetIndividualAccount } from 'reinvest-app-common/src/services/queries/getIndividualAccount';

import { getApiClient } from '../../../../api/getApiClient';
import { UpdateEmploymentDetailsFlowProvider } from './steps';
import { UpdateEmploymentDetailsLayout } from './UpdateEmploymentDetailsLayout';

export const UpdateEmploymentDetails = () => {
  const { data: individualAccount } = useGetIndividualAccount(getApiClient);

  return (
    <UpdateEmploymentDetailsFlowProvider
      initialStoreFields={{
        employmentStatus: individualAccount?.details?.employmentStatus?.status ?? undefined,
        employer: individualAccount?.details?.employer ?? undefined,
      }}
    >
      <UpdateEmploymentDetailsLayout />
    </UpdateEmploymentDetailsFlowProvider>
  );
};
