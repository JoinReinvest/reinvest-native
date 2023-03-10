import React from 'react';

import {WelcomeScreenProps} from './WelcomeScreen.types';
import {MainWrapper} from '@components/MainWrapper';
import {StyledText} from '@components/typography/StyledText/StyledText';
import Screens from '@navigation/screens';
import {Button} from 'react-native';

export const WelcomeScreen = ({navigation}: WelcomeScreenProps) => {
  return (
    <MainWrapper>
      <StyledText variant={'h1'}>Welcome</StyledText>
      <Button
        onPress={() => navigation.navigate(Screens.SignIn)}
        title={'SignIn'}
      />
      <Button
        onPress={() => navigation.navigate(Screens.Registration)}
        title={'Registration'}
      />
    </MainWrapper>
  );
};
