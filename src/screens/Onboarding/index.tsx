import React from 'react';
import {
  onBoardingFormFieldsInitialState,
  OnboardingFormFlowProvider,
} from './flow-steps';

import { BlackLayout } from './BlackLayout';
import { onboardingFormFieldsInitialState, OnboardingFormFlowProvider } from './flow-steps';

export const Onboarding = () => {
  return (
    <OnboardingFormFlowProvider initialStoreFields={onBoardingFormFieldsInitialState}>
      <BlackLayout />
    </OnboardingFormFlowProvider>
  );
};
