import React from 'react';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { DomicileType } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../../api/getApiClient';
import { UpdateDomicileFlowProvider } from './steps';
import { UpdateDomicileLayout } from './UpdateDomicileLayout';

export const UpdateDomicile = () => {
  const { data: userProfile } = useGetUserProfile(getApiClient);

  if (!userProfile?.details?.domicile) {
    return null;
  }

  return (
    <UpdateDomicileFlowProvider
      initialStoreFields={{
        originalType: userProfile.details.domicile.type as DomicileType,
        originalBirthCountry: userProfile.details.domicile.birthCountry as string,
        originalCitizenshipCountry: userProfile.details.domicile.citizenshipCountry as string,
        originalVisaType: userProfile.details.domicile.visaType as string,
        ...userProfile.details.domicile,
      }}
    >
      <UpdateDomicileLayout />
    </UpdateDomicileFlowProvider>
  );
};
