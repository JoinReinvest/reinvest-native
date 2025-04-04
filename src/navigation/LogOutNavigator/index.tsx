import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';

import { DarkScreenHeader } from '../../components/CustomHeader';
import { DialogProvider } from '../../providers/DialogProvider';
import { ResetPassword } from '../../screens/ResetPassword';
import { SignIn } from '../../screens/SignIn';
import { SignUp } from '../../screens/SignUp';
import Screens from '../screens';
import { LogOutStackParamList } from './types';

const LogOutStack = createNativeStackNavigator<LogOutStackParamList>();

const stackOptionsCommon: NativeStackNavigationOptions = {
  headerShown: false,
};

const stackOptions: Record<Extract<Screens, Screens.SignUp | Screens.SignIn | Screens.ResetPassword>, NativeStackNavigationOptions> = {
  [Screens.SignUp]: {
    title: 'Sign Up',
    ...stackOptionsCommon,
  },
  [Screens.SignIn]: {
    title: 'Sign In',
    ...stackOptionsCommon,
  },
  [Screens.ResetPassword]: {
    title: 'logo',
  },
};

export const LogOutNavigator = () => {
  return (
    <DialogProvider dark>
      <LogOutStack.Navigator
        screenOptions={{ gestureEnabled: false, header: DarkScreenHeader }}
        initialRouteName={Screens.SignIn}
      >
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
        <LogOutStack.Screen
          name={Screens.ResetPassword}
          options={stackOptions[Screens.ResetPassword]}
          component={ResetPassword}
        />
      </LogOutStack.Navigator>
    </DialogProvider>
  );
};
