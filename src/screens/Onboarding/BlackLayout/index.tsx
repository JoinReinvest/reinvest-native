import React from 'react';
import {useStepBackOverride} from '@hooks/useBackOverride';
import {MainWrapper} from '@components/MainWrapper';
import {TermsFooter} from '@components/TermsFooter';
import {useOnboardingFormFlow} from '../flow-steps';
import {OnboardingFormFields} from '../types';
import {useKeyboardAware} from '@hooks/useKeyboardAware';

interface Props {
  shouldShowFooter?: boolean;
}
export const BlackLayout = ({shouldShowFooter = true}: Props) => {
  const {CurrentStepView} = useOnboardingFormFlow();
  useStepBackOverride<OnboardingFormFields>(useOnboardingFormFlow);
  useKeyboardAware();

  return (
    <MainWrapper dark>
      <CurrentStepView />
      {shouldShowFooter && <TermsFooter />}
    </MainWrapper>
  );
};
