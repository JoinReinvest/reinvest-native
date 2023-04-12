import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MainWrapper } from '../../components/MainWrapper';
import { StyledText } from '../../components/typography/StyledText';
import { LogInProps } from '../../navigation/LogInNavigator/types';
import Screens from '../../navigation/screens';

export const Dashboard = ({ navigation }: LogInProps<Screens.Dashboard>) => {
  const { top } = useSafeAreaInsets();

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
