import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

import { Loader } from '../components/Loader';
import { palette } from '../constants/theme';
import { useAuth } from '../providers/AuthProvider';
import { LogInNavigator } from './LogInNavigator';
import { LogOutNavigator } from './LogOutNavigator';
import { styles } from './styles';

export const RootNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={[styles.loadingScreen]}>
        <Loader color={palette.frostGreen} />
      </View>
    );
  }

  return <NavigationContainer>{user ? <LogInNavigator /> : <LogOutNavigator />}</NavigationContainer>;
};
