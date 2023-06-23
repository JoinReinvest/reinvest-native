import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useLayoutEffect } from 'react';
import { Linking } from 'react-native';
import { useGetListAccountTypesUserCanOpen } from 'reinvest-app-common/src/services/queries/getListAccountTypesUserCanOpen';
import { AccountType } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../api/getApiClient';
import { Button } from '../../components/Button';
import { Box } from '../../components/Containers/Box/Box';
import { FormTitle } from '../../components/Forms/FormTitle';
import { MainWrapper } from '../../components/MainWrapper';
import { PaddedScrollView } from '../../components/PaddedScrollView';
import { StatusCircle } from '../../components/StatusCircle';
import { TermsFooter } from '../../components/TermsFooter';
import { useLogInNavigation } from '../../navigation/hooks';
import { LogInStackParamList } from '../../navigation/LogInNavigator/types';
import Screens from '../../navigation/screens';
import { currentAccount, useAtom } from '../../store/atoms';

const ACCOUNT_LOCKED_HEADLINES: { [key in AccountType]: string } = {
  [AccountType.Individual]: 'Your Individual account has been locked',
  [AccountType.Corporate]: 'Your Corporate account has been locked',
  [AccountType.Trust]: 'Your Trust account has been locked',
  [AccountType.Beneficiary]: 'Your Beneficiary account has been locked',
};

export const BannedScreen = ({
  route: {
    params: { isBannedAccount = false, isBannedProfile = false, accountType, canGoBack = true },
  },
}: NativeStackScreenProps<LogInStackParamList, Screens.Locked>) => {
  const { data: accountsUserCanOpen } = useGetListAccountTypesUserCanOpen(getApiClient);
  const { navigate, reset, getState } = useLogInNavigation();
  const [account] = useAtom(currentAccount);

  const accountsUserCanOpenWithoutBeneficiary = accountsUserCanOpen?.filter(account => account !== AccountType.Beneficiary);

  const getHeadline = () => {
    if (isBannedProfile) {
      return 'Your profile has been locked.';
    }

    if (!account || !account.type) {
      return 'Verification failed. Your account has been locked.';
    }

    return ACCOUNT_LOCKED_HEADLINES[accountType ?? account.type];
  };

  useLayoutEffect(() => {
    if ((isBannedProfile || !canGoBack) && getState().index !== 0) {
      reset({ index: 0, routes: [{ name: Screens.Locked, params: { isBannedAccount, isBannedProfile, canGoBack, accountType } }] });
    }
  }, [accountType, canGoBack, getState, isBannedAccount, isBannedProfile, reset]);

  return (
    <MainWrapper
      dark
      noPadding
    >
      <PaddedScrollView>
        <Box pt="48">
          <StatusCircle
            dark
            variant="error"
          />
        </Box>
        <FormTitle
          dark
          headline={getHeadline()}
          description="Please reach out to support@reinvestcommunity.com. "
        />
      </PaddedScrollView>
      <Box
        fw
        px="default"
        pb="8"
      >
        <Button onPress={() => Linking.openURL('mailto:support@reinvestcommunity.com')}>Contact Us</Button>
        {!isBannedProfile && accountsUserCanOpenWithoutBeneficiary?.length ? (
          <Button
            dark
            variant="outlined"
            onPress={() => navigate(Screens.Onboarding)}
          >
            Add New Account
          </Button>
        ) : null}
      </Box>
      <TermsFooter />
    </MainWrapper>
  );
};
