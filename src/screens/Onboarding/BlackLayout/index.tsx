import React, { useEffect } from 'react';

import { Icon } from '../../../components/Icon';
import { MainWrapper } from '../../../components/MainWrapper';
import { TermsFooter } from '../../../components/TermsFooter';
import { palette } from '../../../constants/theme';
import { useStepBackOverride } from '../../../hooks/useBackOverride';
import { useKeyboardAware } from '../../../hooks/useKeyboardAware';
import { useLogInNavigation } from '../../../navigation/hooks';
import { LogInStackParamList } from '../../../navigation/LogInNavigator/types';
import Screens from '../../../navigation/screens';
import { DialogProvider } from '../../../providers/DialogProvider';
import { useOnboardingFormFlow } from '../flow-steps';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';

interface Props {
  shouldShowFooter?: boolean;
}

const stepsWithClosingOption = [Identifiers.CONGRATULATIONS];
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

  useEffect(() => {
    if (stepsWithClosingOption.includes(currentStepIdentifier as Identifiers)) {
      navigation.setOptions({
        headerLeft: () => (
          <Icon
            icon="hamburgerClose"
            color={palette.pureWhite}
            onPress={() => navigation.replace(Screens.BottomNavigator, { screen: Screens.Dashboard })}
          />
        ),
      });
    }
  }, [currentStepIdentifier, navigation]);

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
