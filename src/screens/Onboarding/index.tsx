import React from 'react';

import { BlackLayout } from './BlackLayout';
import { onBoardingFormFieldsInitialState, OnboardingFormFlowProvider } from './flow-steps';

//TODO refactor onboarding black screen to use PaddingScroll - Mateusz due avoiding unnecessary conflicts , this will be done during working on api connection branch

export const Onboarding = () => {
  return (
    <OnboardingFormFlowProvider initialStoreFields={onBoardingFormFieldsInitialState}>
      <BlackLayout />
    </OnboardingFormFlowProvider>
  );
};
