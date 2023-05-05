import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';

import { getApiClient } from '../../api/getApiClient';
import { Box } from '../../components/Containers/Box/Box';
import { DarkScreenHeader, ScreenHeader } from '../../components/CustomHeader';
import { Loader } from '../../components/Loader';
import { palette } from '../../constants/theme';
import { DialogProvider } from '../../providers/DialogProvider';
import { ManageAccountMainScreen } from '../../screens/ManageAccount';
import { ManageAccountScreen } from '../../screens/ManageAccount/Screens';
import { Onboarding } from '../../screens/Onboarding';
import { Settings } from '../../screens/Settings';
import { BottomTabsNavigator } from '../BottomTabsNavigator';
import { useLogInNavigation } from '../hooks';
import Screens from '../screens';
import { LogInStackParamList } from './types';

const LogInStack = createNativeStackNavigator<LogInStackParamList>();

const stackOptions: Record<
  Extract<Screens, Screens.Onboarding | Screens.Settings | Screens.ManageAccount | Screens.ManageAccountMainScreen>,
  NativeStackNavigationOptions
> = {
  [Screens.Onboarding]: {
    title: 'logo',
    header: DarkScreenHeader,
  },
  [Screens.Settings]: {
    header: ScreenHeader,
  },
  [Screens.ManageAccountMainScreen]: {
    title: 'Manage Account',
    header: ScreenHeader,
  },
  [Screens.ManageAccount]: {
    title: 'Manage Account',
    headerShown: false,
  },
};

export const LogInNavigator: React.FC = () => {
  const { data, refetch } = useGetUserProfile(getApiClient);
  const navigation = useLogInNavigation();

  useLayoutEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      if (data.isCompleted) {
        navigation.reset({ index: 0, routes: [{ name: Screens.BottomNavigator }] });
      }

      if (!data.isCompleted) {
        navigation.reset({ index: 0, routes: [{ name: Screens.Dashboard }] });
      }
    }
  }, [data, navigation]);

  if (!data)
    return (
      <Box
        flex={1}
        fw
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Loader color={palette.pureBlack} />
      </Box>
    );

  return (
    <BottomSheetModalProvider>
      <SafeAreaProvider>
        <DialogProvider dark={false}>
          <LogInStack.Navigator initialRouteName={!data.isCompleted ? Screens.BottomNavigator : Screens.Onboarding}>
            <LogInStack.Screen
              options={{ headerShown: false }}
              name={Screens.BottomNavigator}
              component={BottomTabsNavigator}
            />
            <LogInStack.Screen
              name={Screens.Onboarding}
              options={stackOptions[Screens.Onboarding]}
              component={Onboarding}
            />
            <LogInStack.Screen
              options={stackOptions[Screens.Settings]}
              name={Screens.Settings}
              component={Settings}
            />
            <LogInStack.Screen
              options={stackOptions[Screens.ManageAccountMainScreen]}
              name={Screens.ManageAccountMainScreen}
              component={ManageAccountMainScreen}
            />
            <LogInStack.Screen
              options={stackOptions[Screens.ManageAccount]}
              name={Screens.ManageAccount}
              component={ManageAccountScreen}
            />
          </LogInStack.Navigator>
        </DialogProvider>
      </SafeAreaProvider>
    </BottomSheetModalProvider>
  );
};
