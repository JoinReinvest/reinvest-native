import { useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';

import { Box } from '../../../../../components/Containers/Box/Box';
import { ScreenHeader } from '../../../../../components/CustomHeader';
import { HeaderCancel } from '../../../../../components/HeaderCancel';
import { Icon } from '../../../../../components/Icon';
import { MainWrapper } from '../../../../../components/MainWrapper';
import { TermsFooter } from '../../../../../components/TermsFooter';
import { palette } from '../../../../../constants/theme';
import { useStepBackOverride } from '../../../../../hooks/useBackOverride';
import { useKeyboardAware } from '../../../../../hooks/useKeyboardAware';
import { useLogInNavigation } from '../../../../../navigation/hooks';
import { LogInStackParamList } from '../../../../../navigation/LogInNavigator/types';
import Screens from '../../../../../navigation/screens';
import { UpdateEmailFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { useUpdateEmailFlow } from '../steps';

export const UpdateEmailLayout = () => {
  const {
    CurrentStepView,
    meta: { currentStepIdentifier, isFirstStep },
    moveToPreviousValidStep,
  } = useUpdateEmailFlow();
  const navigation = useLogInNavigation();
  const route = useRoute();
  const isOnAuthCodeStep = currentStepIdentifier === Identifiers.AUTHENTICATION_CODE;

  useStepBackOverride<UpdateEmailFormFields, LogInStackParamList>(useUpdateEmailFlow, navigation, false, isOnAuthCodeStep);
  useKeyboardAware();

  const headerRight = useCallback(
    () => (
      <HeaderCancel
        dark={isOnAuthCodeStep}
        onPress={() => navigation.navigate(Screens.ManageAccountMainScreen)}
      />
    ),
    [isOnAuthCodeStep, navigation],
  );

  const headerLeft = useCallback(
    () => (
      <Icon
        color={isOnAuthCodeStep ? palette.pureWhite : palette.pureBlack}
        icon={'down'}
        style={{ transform: [{ rotate: '90deg' }] }}
        onPress={() => (isFirstStep ? navigation.goBack() : moveToPreviousValidStep())}
      />
    ),
    [isFirstStep, isOnAuthCodeStep, moveToPreviousValidStep, navigation],
  );

  return (
    <>
      <MainWrapper
        noPadding
        bottomSafe={!isOnAuthCodeStep}
        dark={isOnAuthCodeStep}
      >
        <Box fw>
          <ScreenHeader
            dark={isOnAuthCodeStep}
            navigation={navigation}
            route={route}
            options={{
              title: isOnAuthCodeStep ? 'logo' : 'Email Address',
              headerLeft,
              headerRight,
            }}
            showGradient={true}
          />
        </Box>
        <Box
          fw
          flex={1}
          px="default"
          mt="24"
        >
          <CurrentStepView />
        </Box>
        {isOnAuthCodeStep && <TermsFooter />}
      </MainWrapper>
    </>
  );
};
