import React from 'react';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';

import { getApiClient } from '../../api/getApiClient';
import { StyledText } from '../../components/typography/StyledText';
import { BlackLayout } from './BlackLayout';
import { onBoardingFormFieldsInitialState, OnboardingFormFlowProvider } from './flow-steps';

//TODO refactor onboarding black screen to use PaddingScroll - Mateusz due avoiding unnecessary conflicts , this will be done during working on api connection branch

export const Onboarding = () => {
  const { data, isLoading } = useGetUserProfile(getApiClient);

  return isLoading ? (
    <StyledText>...Loading</StyledText>
  ) : (
    <OnboardingFormFlowProvider
      initialStoreFields={{
        ...onBoardingFormFieldsInitialState,
        ...{ name: { firstName: data?.details?.firstName || '', lastName: data?.details?.lastName || '', middleName: data?.details?.middleName || '' } },
      }}
      // isResumable
    >
      <BlackLayout />
    </OnboardingFormFlowProvider>
  );
};
