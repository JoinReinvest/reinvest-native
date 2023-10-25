import React from 'react';

import { MainWrapper } from '../../../components/MainWrapper';
import { TermsFooter } from '../../../components/TermsFooter';
import { useStepBackOverride } from '../../../hooks/useBackOverride';
import { useKeyboardAware } from '../../../hooks/useKeyboardAware';
import { useLogOutNavigation } from '../../../navigation/hooks';
import { LogOutStackParamList } from '../../../navigation/LogOutNavigator/types';
import { ResetPasswordFormFields } from '../../ResetPassword/types';
import { useRegisterFormFlow } from '../flow-steps';

interface Props {
  shouldShowFooter?: boolean;
}
export const BlackLayout = ({ shouldShowFooter = true }: Props) => {
  const { CurrentStepView } = useRegisterFormFlow();
  const navigation = useLogOutNavigation();
  useStepBackOverride<ResetPasswordFormFields, LogOutStackParamList>(useRegisterFormFlow, navigation);
  useKeyboardAware(true, 16);

  return (
    <MainWrapper
      dark
      noPadding
    >
      <CurrentStepView />
      {shouldShowFooter && <TermsFooter dark />}
    </MainWrapper>
  );
};
