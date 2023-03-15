import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import Screens from '../screens';
import {LogOutStackParamList} from '@navigation/LogOutNavigator/LogOutNavigator.types';
import {SignUp} from '@screens/SignUp';
import {SignIn} from '@screens/SignIn';
import {palette} from '@constants/theme';

const LogOutStack = createNativeStackNavigator<LogOutStackParamList>();

const stackOptionsCommon = {
  headerStyle: {
    backgroundColor: palette.onboarding,
  },
  headerTintColor: palette.darkerGray,
  headerTitleStyle: {
    fontWeight: '700',
  },
  headerShown: false,
} as const;

const stackOptions = {
  [Screens.SignUp]: {
    title: 'Sign Up',
    ...stackOptionsCommon,
  },
  [Screens.SignIn]: {
    title: 'Sign In',
    ...stackOptionsCommon,
  },
} as const;

export const LogOutNavigator: React.FC = () => {
  return (
    <LogOutStack.Navigator>
      <LogOutStack.Screen
        options={stackOptions[Screens.SignUp]}
        name={Screens.SignUp}
        component={SignUp}
      />
      <LogOutStack.Screen
        name={Screens.SignIn}
        options={stackOptions[Screens.SignIn]}
        component={SignIn}
      />
    </LogOutStack.Navigator>
  );
};
