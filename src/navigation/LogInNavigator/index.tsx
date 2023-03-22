import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import Screens from '../screens';
import {LogInStackParamList} from '@navigation/LogInNavigator/types';
import {BottomTabsNavigator} from '@navigation/BottomTabsNavigator';

const LogInStack = createNativeStackNavigator<LogInStackParamList>();

export const LogInNavigator: React.FC = () => {
  return (
    <LogInStack.Navigator>
      <LogInStack.Screen
        options={{headerShown: false}}
        name={Screens.Home}
        component={BottomTabsNavigator}
      />
    </LogInStack.Navigator>
  );
};
