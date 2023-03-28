import { MainWrapper } from '@components/MainWrapper';
import { TermsFooter } from '@components/TermsFooter';
import { useStepBackOverride } from '@hooks/useBackOverride';
import { useKeyboardAware } from '@hooks/useKeyboardAware';
import { DialogProvider } from '@providers/DialogProvider';
import React from 'react';

import { useOnboardingFormFlow } from '../flow-steps';
import { OnboardingFormFields } from '../types';

interface Props {
  shouldShowFooter?: boolean;
}
export const BlackLayout = ({ shouldShowFooter = true }: Props) => {
  const { CurrentStepView } = useOnboardingFormFlow();

  useStepBackOverride<OnboardingFormFields>(useOnboardingFormFlow);
  useKeyboardAware();

  return (
    <DialogProvider dark>
      <MainWrapper dark>
        <CurrentStepView />
        {shouldShowFooter && <TermsFooter />}
      </MainWrapper>
    </DialogProvider>
  );
};
