import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';

import Screens from '../screens';
import {LogInStackParamList} from '@navigation/LogInNavigator/types';
import {BottomTabsNavigator} from '@navigation/BottomTabsNavigator';
import {Onboarding} from '@src/screens/Onboarding';
import {DarkScreenHeader} from '@src/components/CustomHeader';

const LogInStack = createNativeStackNavigator<LogInStackParamList>();

const stackOptions: Record<
  Extract<Screens, Screens.Onboarding>,
  NativeStackNavigationOptions
> = {
  [Screens.Onboarding]: {
    title: 'logo',
    header: DarkScreenHeader,
  },
};

export const LogInNavigator: React.FC = () => {
  return (
    <LogInStack.Navigator>
      <LogInStack.Screen
        options={{headerShown: false}}
        name={Screens.Home}
        component={BottomTabsNavigator}
      />
      <LogInStack.Screen
        name={Screens.Onboarding}
        options={stackOptions[Screens.Onboarding]}
        component={Onboarding}
      />
    </LogInStack.Navigator>
  );
};
