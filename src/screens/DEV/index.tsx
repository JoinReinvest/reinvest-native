import React from 'react';

import { Button } from '../../components/Button';
import { MainWrapper } from '../../components/MainWrapper';
import { StyledText } from '../../components/typography/StyledText';
import { useLogInNavigation } from '../../navigation/hooks';
import Screens from '../../navigation/screens';

export const DEVScreen = () => {
  const navigation = useLogInNavigation();

  return (
    <MainWrapper>
      <StyledText variant="h6">DEV</StyledText>
      <Button
        onPress={() =>
          navigation.navigate(Screens.BottomNavigator, {
            screen: Screens.Dashboard,
          })
        }
      >
        DASHBOARD
      </Button>
    </MainWrapper>
  );
};
