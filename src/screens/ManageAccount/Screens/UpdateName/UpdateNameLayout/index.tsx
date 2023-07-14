import { useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';

import { ScreenHeader } from '../../../../../components/CustomHeader';
import { HeaderCancel } from '../../../../../components/HeaderCancel';
import { Icon } from '../../../../../components/Icon';
import { MainWrapper } from '../../../../../components/MainWrapper';
import { useStepBackOverride } from '../../../../../hooks/useBackOverride';
import { useKeyboardAware } from '../../../../../hooks/useKeyboardAware';
import { useLogInNavigation } from '../../../../../navigation/hooks';
import { LogInStackParamList } from '../../../../../navigation/LogInNavigator/types';
import Screens from '../../../../../navigation/screens';
import { UpdateNameFormFields } from '../form-fields';
import { useUpdateNameFlow } from '../steps';

export const UpdateNameLayout = () => {
  const {
    CurrentStepView,
    meta: { isFirstStep },
    moveToPreviousValidStep,
  } = useUpdateNameFlow();
  const navigation = useLogInNavigation();
  const route = useRoute();

  useStepBackOverride<UpdateNameFormFields, LogInStackParamList>(useUpdateNameFlow, navigation, true);
  useKeyboardAware();

  const headerLeft = useCallback(
    () => (
      <Icon
        icon="down"
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
          headerLeft,
          headerRight,
          title: 'Name',
        }}
      />
      <MainWrapper
        bottomSafe
        noPadding
      >
        <CurrentStepView />
      </MainWrapper>
    </>
  );
};
