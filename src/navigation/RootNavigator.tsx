import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {Button, View} from 'react-native';
import LogOutNavigator from '@navigation/LogOutNavigator/LogOutNavigator';
import LogInNavigator from '@navigation/LogInNavigator/LogInNavigator';

const RootNavigator = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <NavigationContainer>
      {isSignedIn ? <LogInNavigator /> : <LogOutNavigator />}
      <View style={{position: 'absolute', bottom: 24, right: 24}}>
        <Button
          title={!isSignedIn ? 'SignIN' : 'SignOUT'}
          onPress={() => setIsSignedIn(prev => !prev)}
        />
      </View>
    </NavigationContainer>
  );
};

export default RootNavigator;
