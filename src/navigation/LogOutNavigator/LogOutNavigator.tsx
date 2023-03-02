import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import Screens from '../screens';
import {LogOutStackParamList} from '@navigation/LogOutNavigator/LogOutNavigator.types';
import Welcome from '@screens/WelcomeScreen';
import Registration from '@screens/Registration';
import SignIn from '@screens/SignIn';

const LogOutStack = createNativeStackNavigator<LogOutStackParamList>();

const LogOutNavigator: React.FC = () => {
  return (
    <LogOutStack.Navigator>
      <LogOutStack.Screen name={Screens.Welcome} component={Welcome} />
      <LogOutStack.Screen
        name={Screens.Registration}
        component={Registration}
      />
      <LogOutStack.Screen name={Screens.SignIn} component={SignIn} />
    </LogOutStack.Navigator>
  );
};

export default LogOutNavigator;
