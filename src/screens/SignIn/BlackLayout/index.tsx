import React from 'react';
import {useStepBackOverride} from '@hooks/useBackOverride';
import {MainWrapper} from '@components/MainWrapper';
import {TermsFooter} from '@components/TermsFooter';
import {StatusBar} from 'react-native';
import {useLoginFormFlow} from '@screens/SignIn/flow-steps';
import {LoginFormFields} from '@screens/SignIn/SignIn.types';

interface Props {
  shouldShowFooter?: boolean;
}
export const BlackLayout = ({shouldShowFooter = true}: Props) => {
  const {CurrentStepView} = useLoginFormFlow();
  useStepBackOverride<LoginFormFields>(useLoginFormFlow);

  return (
    <MainWrapper shouldSafeArea dark>
      <StatusBar barStyle={'light-content'} />
      <CurrentStepView />
      {shouldShowFooter && <TermsFooter />}
    </MainWrapper>
  );
};
