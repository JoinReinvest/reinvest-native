import React from 'react';

import {DashboardScreenProps} from './types';
import {MainWrapper} from '@components/MainWrapper';
import {StyledText} from '@components/typography/StyledText';
import {useLogInNavigation} from '@src/navigation/hooks';
import Screens from '@src/navigation/screens';

export const Dashboard = ({}: DashboardScreenProps) => {
  const navigation = useLogInNavigation();

  return (
    <MainWrapper>
      <StyledText variant={'h6'}>DashBoard</StyledText>
      <StyledText
        variant="link"
        onPress={() => navigation.navigate(Screens.Onboarding)}>
        Start Onboarding
      </StyledText>
    </MainWrapper>
  );
};
