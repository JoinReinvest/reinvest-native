import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';

import { getApiClient } from '../../api/getApiClient';
import { DarkScreenHeader, ScreenHeader } from '../../components/CustomHeader';
import { InviteScreen } from '../../screens/Invite';
import { Onboarding } from '../../screens/Onboarding';
import { Settings } from '../../screens/Settings';
import { BottomTabsNavigator } from '../BottomTabsNavigator';
import { useLogInNavigation } from '../hooks';
import Screens from '../screens';
import { LogInStackParamList } from './types';

const LogInStack = createNativeStackNavigator<LogInStackParamList>();

const stackOptions: Record<Extract<Screens, Screens.Onboarding | Screens.Invite | Screens.Settings>, NativeStackNavigationOptions> = {
  [Screens.Onboarding]: {
    title: 'logo',
    header: DarkScreenHeader,
  },
  [Screens.Invite]: {
    title: 'Invite a friend',
    header: ScreenHeader,
  },
  [Screens.Settings]: {
    title: 'Settings',
    header: ScreenHeader,
  },
};

export const LogInNavigator: React.FC = () => {
  const { data } = useGetUserProfile(getApiClient);
  const navigation = useLogInNavigation();

  useEffect(() => {
    if (data?.isCompleted) {
      navigation.navigate(Screens.BottomNavigator, { screen: Screens.EducationStack });
    }
  }, [data, navigation]);

  return (
    <LogInStack.Navigator>
      <LogInStack.Screen
        name={Screens.Onboarding}
        options={stackOptions[Screens.Onboarding]}
        component={Onboarding}
      />
      <LogInStack.Screen
        options={{ headerShown: false }}
        name={Screens.BottomNavigator}
        component={BottomTabsNavigator}
      />
      <LogInStack.Screen
        options={stackOptions[Screens.Settings]}
        name={Screens.Settings}
        component={Settings}
      />
      <LogInStack.Screen
        options={stackOptions[Screens.Invite]}
        name={Screens.Invite}
        component={InviteScreen}
      />
    </LogInStack.Navigator>
  );
};
