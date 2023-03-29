import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { useAuth } from '../providers/AuthProvider';
import { LogInNavigator } from './LogInNavigator';
import { LogOutNavigator } from './LogOutNavigator';

export const RootNavigator = () => {
  const { user } = useAuth();

  return <NavigationContainer>{user ? <LogInNavigator /> : <LogOutNavigator />}</NavigationContainer>;
};
