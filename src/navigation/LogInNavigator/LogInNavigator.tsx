import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import Screens from '../screens';
import {HomeScreen} from '@screens/HomeScreen/HomeScreen';
import {LogInStackParamList} from '@navigation/LogInNavigator/LogInNavigator.types';

const LogInStack = createNativeStackNavigator<LogInStackParamList>();

export const LogInNavigator: React.FC = () => {
  return (
    <LogInStack.Navigator>
      <LogInStack.Screen name={Screens.Home} component={HomeScreen} />
    </LogInStack.Navigator>
  );
};
