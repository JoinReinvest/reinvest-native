import React, { useMemo } from 'react';
import { Alert, Button as NativeButton, Linking, Pressable, View } from 'react-native';
import { useGetAccountsOverview } from 'reinvest-app-common/src/services/queries/getAccountsOverview';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../api/getApiClient';
import { AccountSummary } from '../../components/AccountSummary';
import { Button } from '../../components/Button';
import { Box } from '../../components/Containers/Box/Box';
import { Icon } from '../../components/Icon';
import { MainWrapper } from '../../components/MainWrapper';
import { NavigationButton } from '../../components/NavigationButton';
import { StyledText } from '../../components/typography/StyledText';
import { isStaging } from '../../constants/dev';
import { NavigationIdentifiers, SETTINGS_NAVIGATION_LINKS } from '../../constants/navigationLinks';
import { useLogInNavigation } from '../../navigation/hooks';
import Screens from '../../navigation/screens';
import { useAuth } from '../../providers/AuthProvider';
import { styles } from './styles';

export const Settings = () => {
  const { actions, user } = useAuth();
  const navigation = useLogInNavigation();
  const { data: accounts } = useGetAccountsOverview(getApiClient);

  const navigationHandlers: { [key in NavigationIdentifiers]: () => void } = useMemo(
    () => ({
      ADD_BENEFICIARY: () => Alert.alert('Add Beneficiary Flow'),
      ADD_ACCOUNT: () => navigation.navigate(Screens.Onboarding),
      INVITE: () => navigation.navigate(Screens.Invite),
      HELP: () => Linking.openURL('mailto:support@reinvestcommunity.com'),
      SIGN_OUT: () => actions.signOut(),
    }),
    [actions, navigation],
  );

  const account = accounts?.[0] ?? null;

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
      {!isStaging && (
        <>
          {account && (
            <Pressable onPress={() => Alert.alert('Switch Account')}>
              <AccountSummary
                endIcon={<Icon icon="arrowDown" />}
                accountId={account.id ?? ''}
                avatarSize="xl"
                accountType={account.type as DraftAccountType}
                avatarUri={account.avatar?.url ?? undefined}
                label={account.label ?? ''}
                initials={account.avatar?.initials ?? ''}
                nameTextVariant="tableHeading"
                accountLabelTextVariant="paragraph"
              />
            </Pressable>
          )}
          <Box
            fw
            mt="4"
            mb="24"
          >
            <Button>Manage Account</Button>
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
