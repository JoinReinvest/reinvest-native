import React from 'react';

import { MainWrapper } from '../../../components/MainWrapper';
import { TermsFooter } from '../../../components/TermsFooter';
import { useStepBackOverride } from '../../../hooks/useBackOverride';
import { useKeyboardAware } from '../../../hooks/useKeyboardAware';
import { useRegisterFormFlow } from '../flow-steps';
import { RegisterFormFields } from '../types';

/* TODO we should pass noPadding prop to main wrapper and narrow screen directly in content since scroll view scroll indicator is rendered unnecessarily padded
    after merging changes from RIA-525 - Main Wrapper has this additional prop there
 */

interface Props {
  shouldShowFooter?: boolean;
}
export const BlackLayout = ({ shouldShowFooter = true }: Props) => {
  const { CurrentStepView } = useRegisterFormFlow();
  useStepBackOverride<RegisterFormFields>(useRegisterFormFlow);
  useKeyboardAware(true, 16);

  return (
    <MainWrapper dark>
      <CurrentStepView />
      {shouldShowFooter && <TermsFooter />}
    </MainWrapper>
  );
};
