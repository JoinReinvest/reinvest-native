import React, {useEffect} from 'react';

import {DashboardScreenProps} from './types';
import {MainWrapper} from '@components/MainWrapper';
import {StyledText} from '@components/typography/StyledText';
import {useLogInNavigation} from '@src/navigation/hooks';
import Screens from '@src/navigation/screens';
import {apiClient} from '@api/apiClient';
import {useGetUserProfile} from 'reinvest-app-common/src/services/queries/getProfile';

export const Dashboard = ({}: DashboardScreenProps) => {
  const {data, isLoading} = useGetUserProfile(apiClient);

  useEffect(() => {
    console.log({data, isLoading});
  }, [data, isLoading]);

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
