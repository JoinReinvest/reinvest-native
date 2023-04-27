import React from 'react';
import { StatusBar } from 'react-native';

import { MainWrapper } from '../../../components/MainWrapper';
import { TermsFooter } from '../../../components/TermsFooter';
import { useStepBackOverride } from '../../../hooks/useBackOverride';
import { useKeyboardAware } from '../../../hooks/useKeyboardAware';
import { useLogOutNavigation } from '../../../navigation/hooks';
import { LogOutStackParamList } from '../../../navigation/LogOutNavigator/types';
import { ResetPasswordFormFields } from '../../ResetPassword/types';
import { useLoginFormFlow } from '../flow-steps';

interface Props {
  shouldShowFooter?: boolean;
}
export const BlackLayout = ({ shouldShowFooter = true }: Props) => {
  const { CurrentStepView } = useLoginFormFlow();
  const navigation = useLogOutNavigation();
  useStepBackOverride<ResetPasswordFormFields, LogOutStackParamList>(useLoginFormFlow, navigation);
  useKeyboardAware();

  return (
    <MainWrapper dark>
      <StatusBar barStyle="light-content" />
      <CurrentStepView />
      {shouldShowFooter && <TermsFooter />}
    </MainWrapper>
  );
};
