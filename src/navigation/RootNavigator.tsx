import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {LogOutNavigator} from '@navigation/LogOutNavigator/LogOutNavigator';
import {LogInNavigator} from '@navigation/LogInNavigator/LogInNavigator';
import {useAuth} from '@src/providers/AuthProvider';

export const RootNavigator = () => {
  const {loading, user} = useAuth();
  console.log(user);

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
