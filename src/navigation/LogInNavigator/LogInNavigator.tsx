import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import Screens from '../screens';
import Home from '@screens/HomeScreen';
import {LogInStackParamList} from '@navigation/LogInNavigator/LogInNavigator.types';

const LogInStack = createNativeStackNavigator<LogInStackParamList>();

const LogInNavigator: React.FC = () => {
  return (
    <LogInStack.Navigator>
      <LogInStack.Screen name={Screens.Home} component={Home} />
    </LogInStack.Navigator>
  );
};

export default LogInNavigator;
