import React from 'react';

import { BlackLayout } from './BlackLayout';
import { onboardingFormFieldsInitialState, OnboardingFormFlowProvider } from './flow-steps';

export const Onboarding = () => {
  return (
    <OnboardingFormFlowProvider initialStoreFields={onboardingFormFieldsInitialState}>
      <BlackLayout />
    </OnboardingFormFlowProvider>
  );
};
