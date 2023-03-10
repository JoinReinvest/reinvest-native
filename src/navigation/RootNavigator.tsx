import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {LogOutNavigator} from '@navigation/LogOutNavigator';
import {LogInNavigator} from '@navigation/LogInNavigator';
import {useAuth} from '@src/providers/AuthProvider';

export const RootNavigator = () => {
  const {loading, user} = useAuth();

  return (
    <NavigationContainer>
      {user ? <LogInNavigator /> : <LogOutNavigator />}
      <View>
        {loading && (
          <ActivityIndicator style={{...StyleSheet.absoluteFillObject}} />
        )}
      </View>
    </NavigationContainer>
  );
};
