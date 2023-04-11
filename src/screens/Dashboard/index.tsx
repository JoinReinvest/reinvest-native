import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MainWrapper } from '../../components/MainWrapper';
import { StyledText } from '../../components/typography/StyledText';
import { useLogInNavigation } from '../../navigation/hooks';
import Screens from '../../navigation/screens';

export const Dashboard = () => {
  const { top } = useSafeAreaInsets();

  const navigation = useLogInNavigation();

  return (
    <MainWrapper style={{ paddingTop: top }}>
      <StyledText variant="h6">DashBoard</StyledText>
      {__DEV__ && (
        <StyledText
          variant="link"
          onPress={() => navigation.navigate(Screens.Onboarding)}
        >
          Start Onboarding
        </StyledText>
      )}
    </MainWrapper>
  );
};
