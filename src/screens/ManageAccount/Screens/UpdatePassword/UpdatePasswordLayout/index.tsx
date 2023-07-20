import { useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';

import { Box } from '../../../../../components/Containers/Box/Box';
import { ScreenHeader } from '../../../../../components/CustomHeader';
import { HeaderCancel } from '../../../../../components/HeaderCancel';
import { Icon } from '../../../../../components/Icon';
import { MainWrapper } from '../../../../../components/MainWrapper';
import { useStepBackOverride } from '../../../../../hooks/useBackOverride';
import { useKeyboardAware } from '../../../../../hooks/useKeyboardAware';
import { useLogInNavigation } from '../../../../../navigation/hooks';
import { LogInStackParamList } from '../../../../../navigation/LogInNavigator/types';
import Screens from '../../../../../navigation/screens';
import { UpdatePasswordFormFields } from '../form-fields';
import { useUpdateEmailFlow } from '../steps';

export const UpdatePasswordLayout = () => {
  const {
    CurrentStepView,
    meta: { isFirstStep },
    moveToPreviousValidStep,
  } = useUpdateEmailFlow();
  const navigation = useLogInNavigation();
  const route = useRoute();

  useStepBackOverride<UpdatePasswordFormFields, LogInStackParamList>(useUpdateEmailFlow, navigation, false);
  useKeyboardAware();

  const headerLeft = useCallback(
    () => (
      <Icon
        icon={'down'}
        style={{ transform: [{ rotate: '90deg' }] }}
        onPress={isFirstStep ? navigation.goBack : moveToPreviousValidStep}
      />
    ),
    [isFirstStep, moveToPreviousValidStep, navigation],
  );

  const headerRight = useCallback(
    () => <HeaderCancel onPress={() => navigation.navigate(Screens.BottomNavigator, { screen: Screens.Dashboard })} />,
    [navigation],
  );

  return (
    <>
      <ScreenHeader
        navigation={navigation}
        route={route}
        options={{
          title: 'Password',
          headerLeft,
          headerRight,
        }}
        showGradient={true}
      />
      <MainWrapper
        noPadding
        bottomSafe
      >
        <Box
          fw
          flex={1}
          mt="24"
        >
          <CurrentStepView />
        </Box>
      </MainWrapper>
    </>
  );
};
