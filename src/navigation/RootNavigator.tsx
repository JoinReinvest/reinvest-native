import { CLOUDFRONT_URL } from '@env';
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
  prefixes: ['https://reinvest.com', 'reinvest://', 'https://*.reinvest.com', 'http://*.reinvest.com', CLOUDFRONT_URL],
  config,
};

export const RootNavigator = () => {
  const { user } = useAuth();

  return <NavigationContainer linking={linking}>{user ? <LogInNavigator /> : <LogOutNavigator />}</NavigationContainer>;
};
