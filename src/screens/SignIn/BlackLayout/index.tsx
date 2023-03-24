import React from 'react';
import {useStepBackOverride} from '@hooks/useBackOverride';
import {MainWrapper} from '@components/MainWrapper';
import {TermsFooter} from '@components/TermsFooter';
import {StatusBar} from 'react-native';
import {useLoginFormFlow} from '@screens/SignIn/flow-steps';
import {LoginFormFields} from '@screens/SignIn/types';
import {useKeyboardAware} from '@hooks/useKeyboardAware';

interface Props {
  shouldShowFooter?: boolean;
}
export const BlackLayout = ({shouldShowFooter = true}: Props) => {
  const {CurrentStepView} = useLoginFormFlow();
  useStepBackOverride<LoginFormFields>(useLoginFormFlow);
  useKeyboardAware();
  return (
    <MainWrapper dark>
      <StatusBar barStyle={'light-content'} />
      <CurrentStepView />
      {shouldShowFooter && <TermsFooter />}
    </MainWrapper>
  );
};
