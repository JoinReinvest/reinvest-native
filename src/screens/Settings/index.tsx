import React, { useMemo } from 'react';
import { Alert, Button as NativeButton, Linking, View } from 'react-native';
import { useGetAccountsOverview } from 'reinvest-app-common/src/services/queries/getAccountsOverview';

import { getApiClient } from '../../api/getApiClient';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { Box } from '../../components/Containers/Box/Box';
import { Row } from '../../components/Containers/Row';
import { MainWrapper } from '../../components/MainWrapper';
import { InviteModal } from '../../components/Modals/ModalContent/InviteModal';
import { HeaderWithLogo } from '../../components/Modals/ModalHeaders/HeaderWithLogo';
import { NavigationButton } from '../../components/NavigationButton';
import { StyledText } from '../../components/typography/StyledText';
import { isStaging } from '../../constants/dev';
import { NavigationIdentifiers, SETTINGS_NAVIGATION_LINKS } from '../../constants/navigationLinks';
import { useLogInNavigation } from '../../navigation/hooks';
import Screens from '../../navigation/screens';
import { useAuth } from '../../providers/AuthProvider';
import { useDialog } from '../../providers/DialogProvider';
import { styles } from './styles';

export const Settings = () => {
  const { openDialog } = useDialog();
  const { actions, user } = useAuth();
  const navigation = useLogInNavigation();
  const { data: accounts } = useGetAccountsOverview(getApiClient);

  const navigationHandlers: Partial<{ [key in NavigationIdentifiers]: () => void }> = useMemo(
    () => ({
      ADD_BENEFICIARY: () => Alert.alert('Add Beneficiary Flow'),
      ADD_ACCOUNT: () => navigation.navigate(Screens.Onboarding),
      INVITE: () =>
        openDialog(<InviteModal />, {
          showLogo: true,
          header: <HeaderWithLogo />,
          closeIcon: false,
        }),
      HELP: () => Linking.openURL('mailto:support@reinvestcommunity.com'),
      SIGN_OUT: () => actions.signOut(),
    }),
    [actions, openDialog, navigation],
  );

  return (
    <MainWrapper style={{ alignItems: 'flex-start' }}>
      {isStaging && (
        <>
          <NativeButton
            title="start onboarding"
            onPress={navigationHandlers.ADD_ACCOUNT}
          />
          <NativeButton
            title="start onboarding"
            onPress={navigationHandlers.SIGN_OUT}
          />
        </>
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
                    initials={account?.avatar?.initials || ''}
                  />
                </Box>
                <StyledText>{account?.label || account?.type}</StyledText>
              </Row>
            );
          })}
        </>
      )}
      {!isStaging && (
        <>
          <Box
            fw
            my="24"
          >
            <Button onPress={() => navigation.navigate(Screens.ManageAccountMainScreen)}>Manage Account</Button>
          </Box>
          <View style={[styles.fw, styles.linksContainer]}>
            {SETTINGS_NAVIGATION_LINKS.map(({ label, identifier, ...link }, index) => (
              <View
                style={styles.fw}
                key={identifier}
              >
                <NavigationButton
                  {...link}
                  onPress={navigationHandlers[identifier]}
                >
                  {label}
                </NavigationButton>
                {index === 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>
        </>
      )}
      <Box mt={'48'}>
        <StyledText variant="h6">Logged as</StyledText>
        <StyledText variant="paragraphSmall">{user?.getUsername()}</StyledText>
      </Box>
    </MainWrapper>
  );
};
