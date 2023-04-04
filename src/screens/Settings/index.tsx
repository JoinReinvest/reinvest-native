import React from 'react';
import { Button } from 'react-native';

import { Box } from '../../components/Containers/Box/Box';
import { MainWrapper } from '../../components/MainWrapper';
import { StyledText } from '../../components/typography/StyledText';
import { useLogInNavigation } from '../../navigation/hooks';
import Screens from '../../navigation/screens';
import { useAuth } from '../../providers/AuthProvider';

export const Settings = () => {
  const { actions, user } = useAuth();
  const navigation = useLogInNavigation();

  return (
    <MainWrapper style={{ alignItems: 'flex-start' }}>
      <Button
        title="start onboarding"
        onPress={() => navigation.navigate(Screens.Onboarding)}
      />
      <Button
        title="Invite friend"
        onPress={() => navigation.navigate(Screens.Invite)}
      />
      <Button
        title="signout"
        onPress={() => actions.signOut()}
      />
      <Box mt={'48'}>
        <StyledText variant="h6">Logged as</StyledText>
        <StyledText variant="paragraphSmall">{user?.getUsername()}</StyledText>
      </Box>
    </MainWrapper>
  );
};
