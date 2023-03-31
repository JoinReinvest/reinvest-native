import { MainWrapper } from '@components/MainWrapper';
import { StyledText } from '@components/typography/StyledText';
import { useLogInNavigation } from '@src/navigation/hooks';
import Screens from '@src/navigation/screens';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Dashboard = () => {
  const { top } = useSafeAreaInsets();

  const navigation = useLogInNavigation();

  return (
    <MainWrapper style={{ paddingTop: top }}>
      <StyledText variant="h6">DashBoard</StyledText>
      <StyledText
        variant="link"
        onPress={() => navigation.navigate(Screens.Onboarding)}
      >
        Start Onboarding
      </StyledText>
    </MainWrapper>
  );
};
