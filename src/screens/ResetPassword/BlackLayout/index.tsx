import React from 'react';
import { StatusBar } from 'react-native';

import { MainWrapper } from '../../../components/MainWrapper';
import { TermsFooter } from '../../../components/TermsFooter';
import { useStepBackOverride } from '../../../hooks/useBackOverride';
import { useKeyboardAware } from '../../../hooks/useKeyboardAware';
import { useLogOutNavigation } from '../../../navigation/hooks';
import { LogOutStackParamList } from '../../../navigation/LogOutNavigator/types';
import { useResetPasswordFormFlow } from '../flow-steps';
import { ResetPasswordFormFields } from '../types';

interface Props {
  shouldShowFooter?: boolean;
}
export const BlackLayout = ({ shouldShowFooter = true }: Props) => {
  const { CurrentStepView } = useResetPasswordFormFlow();
  const navigation = useLogOutNavigation();
  useStepBackOverride<ResetPasswordFormFields, LogOutStackParamList>(useResetPasswordFormFlow, navigation);
  useKeyboardAware();

  return (
    <MainWrapper
      dark
      noPadding
    >
      <StatusBar barStyle="light-content" />
      <CurrentStepView />
      {shouldShowFooter && <TermsFooter dark />}
    </MainWrapper>
  );
};
