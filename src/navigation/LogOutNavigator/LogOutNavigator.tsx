import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import Screens from '../screens';
import {LogOutStackParamList} from '@navigation/LogOutNavigator/LogOutNavigator.types';
import {Registration} from '@screens/Registration/Registration';
import {SignIn} from '@screens/SignIn/SignIn';
import {palette} from '@assets/theme';
import {WelcomeScreen} from '@screens/WelcomeScreen/WelcomeScreen';

const LogOutStack = createNativeStackNavigator<LogOutStackParamList>();

export const LogOutNavigator: React.FC = () => {
  return (
    <LogOutStack.Navigator>
      <LogOutStack.Screen name={Screens.Welcome} component={WelcomeScreen} />
      <LogOutStack.Screen
        options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: palette.onboarding,
          },
          headerTintColor: palette.darkerGray,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name={Screens.Registration}
        component={Registration}
      />
      <LogOutStack.Screen name={Screens.SignIn} component={SignIn} />
    </LogOutStack.Navigator>
  );
};
