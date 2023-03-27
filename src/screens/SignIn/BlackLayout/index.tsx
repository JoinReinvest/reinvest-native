import { MainWrapper } from '@components/MainWrapper';
import { TermsFooter } from '@components/TermsFooter';
import { useStepBackOverride } from '@hooks/useBackOverride';
import { useLoginFormFlow } from '@screens/SignIn/flow-steps';
import { LoginFormFields } from '@screens/SignIn/SignIn.types';
import React from 'react';
import { StatusBar } from 'react-native';

interface Props {
  shouldShowFooter?: boolean;
}
export const BlackLayout = ({ shouldShowFooter = true }: Props) => {
  const { CurrentStepView } = useLoginFormFlow();
  useStepBackOverride<LoginFormFields>(useLoginFormFlow);

  return (
    <MainWrapper dark>
      <StatusBar barStyle={'light-content'} />
      <CurrentStepView />
      {shouldShowFooter && <TermsFooter />}
    </MainWrapper>
  );
};
