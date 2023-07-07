import React, { useMemo, useRef, useState } from 'react';
import { Linking, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetAccountsOverview } from 'reinvest-app-common/src/services/queries/getAccountsOverview';
import { useGetListAccountTypesUserCanOpen } from 'reinvest-app-common/src/services/queries/getListAccountTypesUserCanOpen';
import { AccountOverview, AccountType } from 'reinvest-app-common/src/types/graphql';

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
import { privacyPolicy, termsAndConditions } from '../../constants/strings';
import { useLogInNavigation } from '../../navigation/hooks';
import Screens from '../../navigation/screens';
import { useAuth } from '../../providers/AuthProvider';
import { useDialog } from '../../providers/DialogProvider';
import { currentAccount, RESET, useAtom } from '../../store/atoms';
import { NAVBAR_HEIGHT, yScale } from '../../utils/scale';
import { styles } from './styles';

const ACCOUNT_TO_OPEN = [AccountType.Individual, AccountType.Corporate, AccountType.Trust];

export const Settings = () => {
  const { actions } = useAuth();
  const { navigate } = useLogInNavigation();
  const { data: accounts } = useGetAccountsOverview(getApiClient);
  const { data: listAccountTypesUserCanOpen } = useGetListAccountTypesUserCanOpen(getApiClient);
  const bottomSheetRef = useRef<BottomSheetHandle>(null);
  const { openDialog } = useDialog();
  const { bottom } = useSafeAreaInsets();
  const [signOutLoading, setSignOutLoading] = useState(false);
  const [account, setAccountAtom] = useAtom(currentAccount);

  const handleSelectAccount = async (value: string) => {
    const account = accounts?.find(account => account?.id === value) ?? accounts?.[0];

    if (account?.type !== AccountType.Beneficiary && account?.isBanned) {
      bottomSheetRef.current?.dismiss();

      return navigate(Screens.Locked, { isBannedAccount: true, accountType: account?.type as AccountType });
    }

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

  const showAddBeneficiaryLink = useMemo(
    () => account.type === AccountType.Individual && listAccountTypesUserCanOpen?.includes(AccountType.Beneficiary),
    [account.type, listAccountTypesUserCanOpen],
  );

  const showAddAnotherAccount = ACCOUNT_TO_OPEN?.some(acc => listAccountTypesUserCanOpen?.includes(acc as AccountType));

  const signOut = () => {
    setSignOutLoading(true);
    actions.signOut(() => {
      setAccountAtom(RESET);
      setSignOutLoading(false);
    });
  };

  return (
    <MainWrapper
      noPadding
      isLoading={signOutLoading}
    >
      <PaddedScrollView>
        {isStaging && (
          <>
            <Button onPress={() => navigate(Screens.Onboarding)}>start onboarding</Button>
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
              onPress={() => navigate(Screens.ManageAccountMainScreen)}
            >
              Manage Account
            </Button>
          </Box>
        )}
        {!isStaging && (
          <View style={[styles.fw, styles.linksContainer]}>
            {showAddBeneficiaryLink && (
              <NavigationButton
                startIcon="addBeneficiary"
                label="Add Beneficiary"
                onPress={() => navigate(Screens.AddBeneficiary)}
              />
            )}
            {showAddAnotherAccount && (
              <NavigationButton
                startIcon="addUser"
                label="Add Another Account"
                onPress={() => navigate(Screens.Onboarding)}
              />
            )}
            <View style={styles.separator} />
            <NavigationButton
              startIcon="friendsAndFamily"
              label="Invite Friends & Family"
              onPress={() =>
                openDialog(<InviteModal />, {
                  showLogo: true,
                  header: <HeaderWithLogo />,
                  closeIcon: false,
                })
              }
            />
            <NavigationButton
              startIcon="helpAndSupport"
              label="Help & Support"
              onPress={() => Linking.openURL('mailto:support@reinvestcommunity.com')}
            />
            <NavigationButton
              startIcon="signOut"
              label="Sign Out"
              showChevron={false}
              onPress={signOut}
            />
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
          pb={Math.max(NAVBAR_HEIGHT + 16, bottom, yScale(16))}
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
