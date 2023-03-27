import { MainWrapper } from '@components/MainWrapper';
import { TermsFooter } from '@components/TermsFooter';
import { useStepBackOverride } from '@hooks/useBackOverride';
import { useRegisterFormFlow } from '@screens/SignUp/flow-steps';
import { RegisterFormFields } from '@screens/SignUp/SignUp.types';
import React from 'react';

interface Props {
  shouldShowFooter?: boolean;
}
export const BlackLayout = ({ shouldShowFooter = true }: Props) => {
  const { CurrentStepView } = useRegisterFormFlow();
  useStepBackOverride<RegisterFormFields>(useRegisterFormFlow);

  return (
    <MainWrapper dark>
      <CurrentStepView />
      {shouldShowFooter && <TermsFooter />}
    </MainWrapper>
  );
};
