import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';

import { DarkScreenHeader } from '../../components/CustomHeader';
import { DEVScreen } from '../../screens/DEV';
import { Onboarding } from '../../screens/Onboarding';
import { Settings } from '../../screens/Settings';
import { BottomTabsNavigator } from '../BottomTabsNavigator';
import Screens from '../screens';
import { LogInStackParamList } from './types';

const LogInStack = createNativeStackNavigator<LogInStackParamList>();

const stackOptions: Record<Extract<Screens, Screens.Onboarding>, NativeStackNavigationOptions> = {
  [Screens.Onboarding]: {
    title: 'logo',
    header: DarkScreenHeader,
  },
};

export const LogInNavigator: React.FC = () => {
  return (
    <LogInStack.Navigator>
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
        name={Screens.Settings}
        component={Settings}
      />
      {__DEV__ && (
        <LogInStack.Screen
          name={Screens.DEV}
          component={DEVScreen}
        />
      )}
    </LogInStack.Navigator>
  );
};
