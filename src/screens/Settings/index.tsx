import { MainWrapper } from '@components/MainWrapper';
import { StyledText } from '@components/typography/StyledText';
import { useAuth } from '@providers/AuthProvider';
import { useLogInNavigation } from '@src/navigation/hooks';
import Screens from '@src/navigation/screens';
import React from 'react';
import { Button } from 'react-native';

export const Settings = () => {
  const { actions, user } = useAuth();
  const navigation = useLogInNavigation();

  return (
    <MainWrapper>
      <StyledText variant="h6">Settings Screen</StyledText>
      <StyledText variant="h6">Logged as</StyledText>
      <StyledText variant="paragraphSmall">{user?.getUsername()}</StyledText>
      <Button
        title="start onboarding"
        onPress={() => navigation.navigate(Screens.Onboarding)}
      />

      <Button
        title="signout"
        onPress={() => actions.signOut()}
      />
    </MainWrapper>
  );
};
