import React from 'react';

import { MainWrapper } from '../../../components/MainWrapper';
import { TermsFooter } from '../../../components/TermsFooter';
import { useStepBackOverride } from '../../../hooks/useBackOverride';
import { useKeyboardAware } from '../../../hooks/useKeyboardAware';
import { useLogInNavigation } from '../../../navigation/hooks';
import { LogInStackParamList } from '../../../navigation/LogInNavigator/types';
import { DialogProvider } from '../../../providers/DialogProvider';
import { useOnboardingFormFlow } from '../flow-steps';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';

interface Props {
  shouldShowFooter?: boolean;
}
export const BlackLayout = ({ shouldShowFooter = true }: Props) => {
  const {
    CurrentStepView,
    meta: { currentStepIdentifier },
  } = useOnboardingFormFlow();
  const navigation = useLogInNavigation();

  useStepBackOverride<OnboardingFormFields, LogInStackParamList>(
    useOnboardingFormFlow,
    navigation,
    true,
    currentStepIdentifier === Identifiers.CONGRATULATIONS,
  );
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
