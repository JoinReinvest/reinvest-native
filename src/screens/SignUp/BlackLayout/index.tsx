import React from 'react';
import {useStepBackOverride} from '@hooks/useBackOverride';
import {MainWrapper} from '@components/MainWrapper';
import {TermsFooter} from '@components/TermsFooter';
import {StatusBar} from 'react-native';
import {useRegisterFormFlow} from '@screens/SignUp/flow-steps';
import {RegisterFormFields} from '@screens/SignUp/SignUp.types';

interface Props {
  shouldShowFooter?: boolean;
}
export const BlackLayout = ({shouldShowFooter = true}: Props) => {
  const {CurrentStepView} = useRegisterFormFlow();
  useStepBackOverride<RegisterFormFields>(useRegisterFormFlow);

  return (
    <MainWrapper shouldSafeArea dark>
      <StatusBar barStyle={'light-content'} />
      <CurrentStepView />
      {shouldShowFooter && <TermsFooter />}
    </MainWrapper>
  );
};
