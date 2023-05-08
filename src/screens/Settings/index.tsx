import React, { useMemo, useRef, useState } from 'react';
import { Alert, Linking, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetAccountsOverview } from 'reinvest-app-common/src/services/queries/getAccountsOverview';
import { AccountOverview } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../api/getApiClient';
import { AccountSummary, AccountSummaryProps } from '../../components/AccountSummary';
import { BottomSheetHandle, StyledBottomSheet } from '../../components/BottomSheet/BottomSheet';
import { Button } from '../../components/Button';
import { Box } from '../../components/Containers/Box/Box';
import { Row } from '../../components/Containers/Row';
import { Icon } from '../../components/Icon';
import { MainWrapper } from '../../components/MainWrapper';
import { FormModalDisclaimer } from '../../components/Modals/ModalContent/FormModalDisclaimer';
import { InviteModal } from '../../components/Modals/ModalContent/InviteModal';
import { HeaderWithLogo } from '../../components/Modals/ModalHeaders/HeaderWithLogo';
import { NavigationButton } from '../../components/NavigationButton';
import { PaddedScrollView } from '../../components/PaddedScrollView';
import { SwitchAccountsList } from '../../components/SwtichAccounts';
import { StyledText } from '../../components/typography/StyledText';
import { isStaging } from '../../constants/dev';
import { NavigationIdentifiers, SETTINGS_NAVIGATION_LINKS } from '../../constants/navigationLinks';
import { privacyPolicy, termsAndConditions } from '../../constants/strings';
import { useLogInNavigation } from '../../navigation/hooks';
import Screens from '../../navigation/screens';
import { useAuth } from '../../providers/AuthProvider';
import { useDialog } from '../../providers/DialogProvider';
import { currentAccount, RESET, useAtom } from '../../store/atoms';
import { NAVBAR_HEIGHT, yScale } from '../../utils/scale';
import { styles } from './styles';

export const Settings = () => {
  const { actions } = useAuth();
  const navigation = useLogInNavigation();
  const { data: accounts } = useGetAccountsOverview(getApiClient);
  const bottomSheetRef = useRef<BottomSheetHandle>(null);
  const { openDialog } = useDialog();
  const { bottom } = useSafeAreaInsets();
  const [signOutLoading, setSignOutLoading] = useState(false);
  const [account, setAccountAtom] = useAtom(currentAccount);

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
      SIGN_OUT: () => {
        setSignOutLoading(true);
        setAccountAtom(RESET);
        actions.signOut();
      },
    }),
    [navigation, openDialog, setAccountAtom, actions],
  );

  const handleSelectAccount = (value: string) => {
    const account = accounts?.find(account => account?.id === value) ?? accounts?.[0];
    setAccountAtom(account as AccountOverview);
    bottomSheetRef.current?.dismiss();
  };

  const showTerms = () => {
    openDialog(
      <FormModalDisclaimer
        headline="Terms and Conditions"
        content={termsAndConditions}
      />,
    );
  };

  const showPP = () => {
    openDialog(
      <FormModalDisclaimer
        headline="Privacy Policy"
        content={privacyPolicy}
      />,
    );
  };

  return (
    <MainWrapper
      bottomSafe
      noPadding
      isLoading={signOutLoading}
    >
      <PaddedScrollView>
        {isStaging && (
          <>
            <Button onPress={navigationHandlers.ADD_ACCOUNT}>start onboarding</Button>
          </>
        )}
        {!!accounts?.length && (
          <Box
            py={'24'}
            fw
          >
            <AccountSummary
              {...(account as AccountSummaryProps)}
              endIcon={
                <Icon
                  icon={'arrowDown'}
                  onPress={() => {
                    bottomSheetRef.current?.present();
                  }}
                />
              }
              isLoading={signOutLoading}
            />
            <Button
              style={styles.manageAccountButton}
              onPress={() => navigation.navigate(Screens.ManageAccountMainScreen)}
            >
              Manage Account
            </Button>
          </Box>
        )}
        {!isStaging && (
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
        )}
      </PaddedScrollView>
      <Row
        fw
        px="default"
        justifyContent={'space-between'}
        mt={'48'}
        pb={'24'}
      >
        <StyledText
          color="dark3"
          onPress={showTerms}
          variant="link"
        >
          Terms of Conditions
        </StyledText>
        <StyledText
          color="dark3"
          variant="link"
          onPress={showPP}
        >
          Privacy Policy
        </StyledText>
      </Row>
      <StyledBottomSheet
        ref={bottomSheetRef}
        title={'Switch accounts'}
      >
        <Box
          fw
          pb={Math.max(NAVBAR_HEIGHT, bottom, yScale(16))}
        >
          <SwitchAccountsList
            value={account?.id || ''}
            avatarSize={'l'}
            onSelect={handleSelectAccount}
            accounts={accounts as AccountSummaryProps[]}
          />
        </Box>
      </StyledBottomSheet>
    </MainWrapper>
  );
};
