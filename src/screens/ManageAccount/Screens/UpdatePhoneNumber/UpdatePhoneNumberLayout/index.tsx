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
import { UpdatePhoneNumberFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { useUpdatePhoneNumberFlow } from '../steps';

export const UpdatePhoneNumberLayout = () => {
  const {
    CurrentStepView,
    meta: { currentStepIdentifier, isFirstStep },
    moveToPreviousValidStep,
  } = useUpdatePhoneNumberFlow();
  const navigation = useLogInNavigation();
  const route = useRoute();
  const isOnAuthCodeStep = currentStepIdentifier === Identifiers.AUTHENTICATION_CODE;

  useStepBackOverride<UpdatePhoneNumberFormFields, LogInStackParamList>(useUpdatePhoneNumberFlow, navigation, false, isOnAuthCodeStep);
  useKeyboardAware();

  const headerRight = useCallback(
    () => <HeaderCancel onPress={() => navigation.navigate(Screens.BottomNavigator, { screen: Screens.Dashboard })} />,
    [navigation],
  );

  const headerLeft = useCallback(
    () => (
      <Icon
        color={palette.pureBlack}
        icon={'down'}
        style={{ transform: [{ rotate: '90deg' }] }}
        onPress={() => (isFirstStep ? navigation.goBack() : moveToPreviousValidStep())}
      />
    ),
    [isFirstStep, moveToPreviousValidStep, navigation],
  );

  return (
    <>
      <MainWrapper
        noPadding
        bottomSafe
      >
        <Box fw>
          <ScreenHeader
            navigation={navigation}
            route={route}
            options={{
              title: isOnAuthCodeStep ? 'logo' : 'Phone Number',
              headerLeft,
              headerRight,
            }}
            showGradient={true}
          />
        </Box>
        <Box
          fw
          flex={1}
          mt="24"
        >
          <CurrentStepView />
        </Box>
        {isOnAuthCodeStep && <TermsFooter noPadding />}
      </MainWrapper>
    </>
  );
};
