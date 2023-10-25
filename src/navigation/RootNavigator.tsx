import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { useAuth } from '../providers/AuthProvider';
import { LogInNavigator } from './LogInNavigator';
import { LogOutNavigator } from './LogOutNavigator';
import Screens from './screens';

const config = {
  screens: {
    [Screens.SignUp]: 'referral/:referralCode',
  },
};

const linking = {
  prefixes: ['https://reinvestcommunity.com', 'reinvest://', 'https://*.reinvestcommunity.com', 'http://*.reinvestcommunity.com'],
  config,
};

export const RootNavigator = () => {
  const { loggedIn } = useAuth();

  return <NavigationContainer linking={linking}>{loggedIn ? <LogInNavigator /> : <LogOutNavigator />}</NavigationContainer>;
};
