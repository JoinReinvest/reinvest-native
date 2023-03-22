import React from 'react';
import {MainWrapper} from '@components/MainWrapper';
import {StyledText} from '@components/typography/StyledText';
import {Button} from 'react-native';
import {useAuth} from '@providers/AuthProvider';

export const Settings = () => {
  const {actions, user} = useAuth();

  return (
    <MainWrapper>
      <StyledText variant={'h6'}>Settings Screen</StyledText>
      <StyledText variant={'h6'}>Logged as</StyledText>
      <StyledText variant={'paragraphSmall'}>{user?.getUsername()}</StyledText>
      <Button title={'signout'} onPress={() => actions.signOut()} />
    </MainWrapper>
  );
};
