import React from 'react';
import { useArchiveBeneficiaryAccount } from 'reinvest-app-common/src/services/queries/archiveBeneficiaryAccount';
import { useGetAccountsOverview } from 'reinvest-app-common/src/services/queries/getAccountsOverview';
import { useGetAccountStats } from 'reinvest-app-common/src/services/queries/getAccountStats';
import { AccountType, Usd } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { Row } from '../../../components/Containers/Row';
import { Loader } from '../../../components/Loader';
import { MainWrapper } from '../../../components/MainWrapper';
import { AmountUpdate } from '../../../components/Modals/ModalContent/AmountUpdate';
import { HeaderWithLogo } from '../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { QUERY_REFETCH_INTERVAL_MS } from '../../../constants/queries';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { useDialog } from '../../../providers/DialogProvider';
import { currentAccount, useAtom } from '../../../store/atoms';

export const RemoveBeneficiary = () => {
  const [activeAccount, setActiveAccount] = useAtom(currentAccount);
  const { openDialog } = useDialog();
  const { navigate } = useLogInNavigation();
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccountsOverview(getApiClient);
  const { mutateAsync: archiveBeneficiary } = useArchiveBeneficiaryAccount(getApiClient);
  const { data: beneficiaryAccountStats, isLoading: isLoadingBeneficiaryAccountStats } = useGetAccountStats(getApiClient, {
    accountId: activeAccount.id ?? '',
    config: {
      enabled: activeAccount.type === AccountType.Beneficiary,
      refetchInterval: QUERY_REFETCH_INTERVAL_MS,
    },
  });

  const individualAccountId = accounts?.find(acc => acc?.type === AccountType.Individual)?.id ?? '';
  const { refetch: refetchIndividualAccountStats } = useGetAccountStats(getApiClient, {
    accountId: individualAccountId,
    config: {
      enabled: !!individualAccountId,
      refetchInterval: QUERY_REFETCH_INTERVAL_MS,
    },
  });

  const isLoading = isLoadingAccounts || isLoadingBeneficiaryAccountStats;
  const individualAccount = accounts?.find(account => account?.type === AccountType.Individual);

  if (!individualAccount) {
    throw new Error('No Individual account found, cannot remove beneficiary!');
  }

  const handleDialogClose = async () => {
    // update individual stats with updated total value and switch to individual account
    await refetchIndividualAccountStats();
    setActiveAccount(individualAccount);
    navigate(Screens.BottomNavigator, { screen: Screens.Dashboard });
  };

  const deleteAccount = async () => {
    const { archived, parentAccountUpdatedValue } = await archiveBeneficiary({ accountId: activeAccount.id ?? '' });

    if (archived) {
      openDialog(
        <AmountUpdate
          amount={(parentAccountUpdatedValue as Usd) ?? undefined}
          headline="Beneficiary Account Removed"
          disclaimer="Updated Individual Account Value."
          onClose={handleDialogClose}
        />,
        { showLogo: true, header: <HeaderWithLogo onClose={handleDialogClose} /> },
      );
    }
  };

  return (
    <MainWrapper
      style={{ paddingTop: 24 }}
      bottomSafe
      noPadding
    >
      <PaddedScrollView contentContainerStyle={{ flexDirection: 'column', rowGap: 24 }}>
        <Box>
          <Row mb="8">
            <StyledText variant="paragraphEmp">Account Value</StyledText>
          </Row>
          {isLoading ? <Loader /> : <StyledText variant="dividend">{beneficiaryAccountStats?.accountValue}</StyledText>}
        </Box>
        <StyledText variant="paragraphLarge">Are you sure you’d like to remove Nellie Brewer as an account beneficiary?</StyledText>
        <StyledText variant="paragraphLarge">Removing Nellie Brewer will re-allocate all their investments into your main account. </StyledText>
      </PaddedScrollView>
      <Box
        fw
        px="default"
      >
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          isDestructive
          onPress={deleteAccount}
        >
          Remove Account
        </Button>
      </Box>
    </MainWrapper>
  );
};
