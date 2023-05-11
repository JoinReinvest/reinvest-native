import React from 'react';

import { MainWrapper } from '../../../components/MainWrapper';
import { TermsFooter } from '../../../components/TermsFooter';
import { useStepBackOverride } from '../../../hooks/useBackOverride';
import { useKeyboardAware } from '../../../hooks/useKeyboardAware';
import { useLogInNavigation } from '../../../navigation/hooks';
import { LogInStackParamList } from '../../../navigation/LogInNavigator/types';
import { DialogProvider } from '../../../providers/DialogProvider';
import { useKYCFailedFlow } from '../flow-steps';
import { KYCFailedFormFields } from '../types';

interface Props {
  shouldShowFooter?: boolean;
}
export const BlackLayout = ({ shouldShowFooter = true }: Props) => {
  const { CurrentStepView } = useKYCFailedFlow();
  const navigation = useLogInNavigation();

  useStepBackOverride<KYCFailedFormFields, LogInStackParamList>(useKYCFailedFlow, navigation);
  useKeyboardAware();

  return (
    <DialogProvider dark>
      <MainWrapper
        dark
        noPadding
      >
        <CurrentStepView />
        {shouldShowFooter && <TermsFooter dark />}
      </MainWrapper>
    </DialogProvider>
  );
};
