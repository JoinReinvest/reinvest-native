import React from 'react';

import { BlackLayout } from './BlackLayout';
import { onBoardingFormFieldsInitialState, OnboardingFormFlowProvider } from './flow-steps';

export const Onboarding = () => {
  return (
    <OnboardingFormFlowProvider initialStoreFields={onBoardingFormFieldsInitialState}>
      <BlackLayout />
    </OnboardingFormFlowProvider>
  );
};
