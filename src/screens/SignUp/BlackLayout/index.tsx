import { MainWrapper } from '@components/MainWrapper';
import { TermsFooter } from '@components/TermsFooter';
import { useStepBackOverride } from '@hooks/useBackOverride';
import { useKeyboardAware } from '@hooks/useKeyboardAware';
import { useRegisterFormFlow } from '@screens/SignUp/flow-steps';
import { RegisterFormFields } from '@screens/SignUp/types';
import React from 'react';

/* TODO we should pass noPadding prop to main wrapper and narrow screen directly in content since scroll view scroll indicator is rendered unnecessarily padded
    after merging changes from RIA-525 - Main Wrapper has this additional prop there
 */

interface Props {
  shouldShowFooter?: boolean;
}
export const BlackLayout = ({ shouldShowFooter = true }: Props) => {
  const { CurrentStepView } = useRegisterFormFlow();
  useStepBackOverride<RegisterFormFields>(useRegisterFormFlow);
  useKeyboardAware();

  return (
    <MainWrapper dark>
      <CurrentStepView />
      {shouldShowFooter && <TermsFooter />}
    </MainWrapper>
  );
};
