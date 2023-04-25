import { API_URL } from '@env';
import React from 'react';
import { Button } from 'react-native';
import { useGetAccountsOverview } from 'reinvest-app-common/src/services/queries/getAccountsOverview';

import { getApiClient } from '../../api/getApiClient';
import { Avatar } from '../../components/Avatar';
import { Box } from '../../components/Containers/Box/Box';
import { Row } from '../../components/Containers/Row';
import { MainWrapper } from '../../components/MainWrapper';
import { StyledText } from '../../components/typography/StyledText';
import { useLogInNavigation } from '../../navigation/hooks';
import Screens from '../../navigation/screens';
import { useAuth } from '../../providers/AuthProvider';

export const Settings = () => {
  const { actions, user } = useAuth();
  const navigation = useLogInNavigation();
  const { data: accounts } = useGetAccountsOverview(getApiClient);

  return (
    <MainWrapper style={{ alignItems: 'flex-start' }}>
      {/*For testing purposes - this option is removed for staging right now*/}
      {API_URL === 'https://cosw3jp4f3.execute-api.us-east-1.amazonaws.com' && (
        <Button
          title="start onboarding"
          onPress={() => navigation.navigate(Screens.Onboarding)}
        />
      )}
      {!!accounts?.length && (
        <>
          <StyledText variant={'h3'}>Accounts</StyledText>
          {accounts.map(account => {
            return (
              <Row
                key={account?.id}
                alignItems={'center'}
                py={'12'}
              >
                <Box mr={'8'}>
                  <Avatar
                    uri={account?.avatar?.url || ''}
                    username={account?.label || ''}
                  ></Avatar>
                </Box>
                <StyledText>{account?.type}</StyledText>
              </Row>
            );
          })}
        </>
      )}
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
