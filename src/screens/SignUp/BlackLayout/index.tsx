import React from 'react';

import { MainWrapper } from '../../../components/MainWrapper';
import { TermsFooter } from '../../../components/TermsFooter';
import { useStepBackOverride } from '../../../hooks/useBackOverride';
import { useKeyboardAware } from '../../../hooks/useKeyboardAware';
import { useRegisterFormFlow } from '../flow-steps';
import { RegisterFormFields } from '../types';

interface Props {
  shouldShowFooter?: boolean;
}
export const BlackLayout = ({ shouldShowFooter = true }: Props) => {
  const { CurrentStepView } = useRegisterFormFlow();
  useStepBackOverride<RegisterFormFields>(useRegisterFormFlow);
  useKeyboardAware(true, 16);

  return (
    <MainWrapper
      dark
      noPadding
    >
      <CurrentStepView />
      {shouldShowFooter && <TermsFooter />}
    </MainWrapper>
  );
};
