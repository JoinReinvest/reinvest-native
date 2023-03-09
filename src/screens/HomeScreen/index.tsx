import React from 'react';

import {WelcomeScreenProps} from './HomeScreen.types';
import {MainWrapper} from '@components/MainWrapper';
import {StyledText} from '@components/typography/StyledText/StyledText';
import {Button} from 'react-native';
import {useAuth} from '@src/providers/AuthProvider';

export const HomeScreen = ({}: WelcomeScreenProps) => {
  const {actions, user} = useAuth();
  return (
    <MainWrapper>
      <StyledText variant={'h1'}>Home</StyledText>
      <StyledText variant={'h6'}>Logged as</StyledText>
      <StyledText variant={'paragraphSmall'}>{user?.getUsername()}</StyledText>
      <Button title={'signout'} onPress={() => actions.signOut()} />
    </MainWrapper>
  );
};
