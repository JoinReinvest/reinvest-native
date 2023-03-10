import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import Screens from '../screens';
import {LogOutStackParamList} from '@navigation/LogOutNavigator/LogOutNavigator.types';
import {Registration} from '@screens/Registration';
import {SignIn} from '@screens/SignIn';
import {palette} from '@constants/theme';
import {WelcomeScreen} from '@screens/WelcomeScreen';

const LogOutStack = createNativeStackNavigator<LogOutStackParamList>();

const stackOptions = {
  [Screens.Registration]: {
    title: 'My home',
    headerStyle: {
      backgroundColor: palette.onboarding,
    },
    headerTintColor: palette.darkerGray,
    headerTitleStyle: {
      fontWeight: '700',
    },
  },
} as const;

export const LogOutNavigator: React.FC = () => {
  return (
    <LogOutStack.Navigator>
      <LogOutStack.Screen name={Screens.Welcome} component={WelcomeScreen} />
      <LogOutStack.Screen
        options={stackOptions[Screens.Registration]}
        name={Screens.Registration}
        component={Registration}
      />
      <LogOutStack.Screen name={Screens.SignIn} component={SignIn} />
    </LogOutStack.Navigator>
  );
};
