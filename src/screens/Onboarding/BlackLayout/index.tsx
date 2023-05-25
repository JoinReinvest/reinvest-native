import { useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';

import { DarkScreenHeader } from '../../../components/CustomHeader';
import { Icon } from '../../../components/Icon';
import { MainWrapper } from '../../../components/MainWrapper';
import { TermsFooter } from '../../../components/TermsFooter';
import { palette } from '../../../constants/theme';
import { useStepBackOverride } from '../../../hooks/useBackOverride';
import { useKeyboardAware } from '../../../hooks/useKeyboardAware';
import { useLogInNavigation } from '../../../navigation/hooks';
import { LogInRouteProps, LogInStackParamList } from '../../../navigation/LogInNavigator/types';
import Screens from '../../../navigation/screens';
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
    meta: { isLastStep, currentStepIdentifier },
  } = useOnboardingFormFlow();
  const navigation = useLogInNavigation();
  const route = useRoute<LogInRouteProps<Screens.Onboarding>>();
  useStepBackOverride<OnboardingFormFields, LogInStackParamList>(
    useOnboardingFormFlow,
    navigation,
    true,
    currentStepIdentifier === Identifiers.CONGRATULATIONS,
  );
  useKeyboardAware();

  const getHeaderLeft = useCallback(
    () => (
      <Icon
        icon="hamburgerClose"
        color={palette.pureWhite}
        onPress={() => navigation.navigate(Screens.BottomNavigator, { screen: Screens.Dashboard })}
      />
    ),
    [navigation],
  );

  return (
    <DialogProvider dark>
      <DarkScreenHeader
        navigation={navigation}
        route={route}
        options={{
          title: 'logo',
          headerLeft: isLastStep ? getHeaderLeft : undefined,
        }}
      />
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
