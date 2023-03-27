import { MainWrapper } from '@components/MainWrapper';
import { StyledText } from '@components/typography/StyledText';
import { useLogInNavigation } from '@src/navigation/hooks';
import Screens from '@src/navigation/screens';
import { useAuth } from '@src/providers/AuthProvider';
import React from 'react';
import { Button } from 'react-native';

import { DashboardScreenProps } from './types';

export const Dashboard = ({}: DashboardScreenProps) => {
  const { actions, user } = useAuth();
  const navigation = useLogInNavigation();

  return (
    <MainWrapper>
      <StyledText variant={'h6'}>Logged as</StyledText>
      <StyledText variant={'paragraphSmall'}>{user?.getUsername()}</StyledText>
      <StyledText
        variant="link"
        onPress={() => navigation.navigate(Screens.Onboarding)}
      >
        Start Onboarding
      </StyledText>
      <Button
        title={'signout'}
        onPress={() => actions.signOut()}
      />
    </MainWrapper>
  );
};
