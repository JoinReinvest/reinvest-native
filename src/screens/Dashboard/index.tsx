import React from 'react';

import {DashboardScreenProps} from './types';
import {MainWrapper} from '@components/MainWrapper';
import {StyledText} from '@components/typography/StyledText';
import {Button} from 'react-native';
import {useAuth} from '@src/providers/AuthProvider';

export const Dashboard = ({}: DashboardScreenProps) => {
  const {actions, user} = useAuth();
  return (
    <MainWrapper>
      <StyledText variant={'h6'}>Logged as</StyledText>
      <StyledText variant={'paragraphSmall'}>{user?.getUsername()}</StyledText>
      <Button title={'signout'} onPress={() => actions.signOut()} />
    </MainWrapper>
  );
};
