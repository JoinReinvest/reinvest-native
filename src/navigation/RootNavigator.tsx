import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Config from 'react-native-config';

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
  prefixes: [
    'https://reinvest.com',
    'reinvest://',
    'https://*.reinvest.com',
    'http://*.reinvest.com',
    Config.CLOUDFRONT_STG,
    Config.CLOUDFRONT_INT,
    Config.CLOUDFRONT_DEV,
  ],
  config,
};

export const RootNavigator = () => {
  const { loggedIn } = useAuth();

  return <NavigationContainer linking={linking}>{loggedIn ? <LogInNavigator /> : <LogOutNavigator />}</NavigationContainer>;
};
