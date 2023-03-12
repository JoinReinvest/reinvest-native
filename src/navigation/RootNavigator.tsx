import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogOutNavigator} from '@navigation/LogOutNavigator';
import {LogInNavigator} from '@navigation/LogInNavigator';
import {useAuth} from '@src/providers/AuthProvider';

export const RootNavigator = () => {
  const {user} = useAuth();

  return (
    <NavigationContainer>
      {user ? <LogInNavigator /> : <LogOutNavigator />}
    </NavigationContainer>
  );
};
