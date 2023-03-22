import React from 'react';
import {
  onboardingFormFieldsInitialState,
  OnboardingFormFlowProvider,
} from './flow-steps';

import {BlackLayout} from './BlackLayout';

export const Onboarding = () => {
  return (
    <OnboardingFormFlowProvider
      initialStoreFields={onboardingFormFieldsInitialState}>
      <BlackLayout />
    </OnboardingFormFlowProvider>
  );
};
