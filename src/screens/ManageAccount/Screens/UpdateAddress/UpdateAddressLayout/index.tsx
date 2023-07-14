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
import { AddressFields } from '../form-fields';
import { useUpdateAddressFlow } from '../steps';

export const UpdateAddressLayout = () => {
  const {
    CurrentStepView,
    meta: { isFirstStep },
    moveToPreviousValidStep,
  } = useUpdateAddressFlow();
  const navigation = useLogInNavigation();
  const route = useRoute();

  useStepBackOverride<AddressFields, LogInStackParamList>(useUpdateAddressFlow, navigation, false);
  useKeyboardAware();

  const headerLeft = useCallback(
    () => (
      <Icon
        icon={'down'}
        style={{ transform: [{ rotate: '90deg' }] }}
        onPress={() => (isFirstStep ? navigation.goBack() : moveToPreviousValidStep())}
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
      <MainWrapper
        noPadding
        bottomSafe
      >
        <Box fw>
          <ScreenHeader
            navigation={navigation}
            route={route}
            options={{
              title: 'Residential Address',
              headerLeft,
              headerRight,
            }}
            showGradient={true}
          />
        </Box>
        <CurrentStepView />
      </MainWrapper>
    </>
  );
};
