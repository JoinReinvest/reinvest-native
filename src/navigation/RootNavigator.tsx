import { LogInNavigator } from '@navigation/LogInNavigator';
import { LogOutNavigator } from '@navigation/LogOutNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '@src/providers/AuthProvider';
import React from 'react';

export const RootNavigator = () => {
  const { user } = useAuth();

  return <NavigationContainer>{user ? <LogInNavigator /> : <LogOutNavigator />}</NavigationContainer>;
};
