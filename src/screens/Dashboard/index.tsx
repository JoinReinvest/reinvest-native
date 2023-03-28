import { apiClient } from '@api/apiClient';
import { MainWrapper } from '@components/MainWrapper';
import { StyledText } from '@components/typography/StyledText';
import { useLogInNavigation } from '@src/navigation/hooks';
import Screens from '@src/navigation/screens';
import React, { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';

import { DashboardScreenProps } from './types';

export const Dashboard = ({}: DashboardScreenProps) => {
  const { data, isLoading } = useGetUserProfile(apiClient);
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    console.log({ data, isLoading });
  }, [data, isLoading]);

  const navigation = useLogInNavigation();

  return (
    <MainWrapper style={{ paddingTop: top }}>
      <StyledText variant={'h6'}>DashBoard</StyledText>
      <StyledText
        variant="link"
        onPress={() => navigation.navigate(Screens.Onboarding)}
      >
        Start Onboarding
      </StyledText>
    </MainWrapper>
  );
};
