import React from 'react';
import {useStepBackOverride} from '@hooks/useBackOverride';
import {MainWrapper} from '@components/MainWrapper';
import {TermsFooter} from '@components/TermsFooter';
import {StatusBar} from 'react-native';
import {useResetPasswordFormFlow} from '../flow-steps';
import {ResetPasswordFormFields} from '../types';
import {useKeyboardAware} from '@hooks/useKeyboardAware';

interface Props {
  shouldShowFooter?: boolean;
}
export const BlackLayout = ({shouldShowFooter = true}: Props) => {
  const {CurrentStepView} = useResetPasswordFormFlow();
  useStepBackOverride<ResetPasswordFormFields>(useResetPasswordFormFlow);
  useKeyboardAware();
  return (
    <MainWrapper dark>
      <StatusBar barStyle={'light-content'} />
      <CurrentStepView />
      {shouldShowFooter && <TermsFooter />}
    </MainWrapper>
  );
};
