import React from 'react';
import { useGetAccountsOverview } from 'reinvest-app-common/src/services/queries/getAccountsOverview';
import { useGetAccountStats } from 'reinvest-app-common/src/services/queries/getAccountStats';
import { AccountType } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { queryClient } from '../../../App';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { Row } from '../../../components/Containers/Row';
import { Loader } from '../../../components/Loader';
import { MainWrapper } from '../../../components/MainWrapper';
import { BeneficiaryRemoveSuccess } from '../../../components/Modals/ModalContent/RemovedBeneficiarySucces';
import { HeaderWithLogo } from '../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { useDialog } from '../../../providers/DialogProvider';
import { currentAccount, useAtom } from '../../../store/atoms';

export const RemoveBeneficiary = () => {
  const [activeAccount, setActiveAccount] = useAtom(currentAccount);
  const { openDialog } = useDialog();
  const { navigate } = useLogInNavigation();
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccountsOverview(getApiClient);
  const { data: accountStats, isLoading: isLoadingStats } = useGetAccountStats(getApiClient, {
    accountId: activeAccount.id ?? '',
    config: {
      enabled: activeAccount.type === AccountType.Beneficiary,
    },
  });

  const isLoading = isLoadingAccounts || isLoadingStats;
  const individualAccount = accounts?.find(account => account?.type === AccountType.Individual);

  if (!individualAccount) {
    throw new Error('No Individual account found, cannot remove beneficiary!');
  }

  const handleDialogClose = () => {
    // when removed switch to individual account:
    setActiveAccount(individualAccount);
    queryClient.invalidateQueries(['getAccountStats', 'getAccountsOverview']);

    navigate(Screens.BottomNavigator, { screen: Screens.Dashboard });
  };

  const deleteAccount = () => {
    openDialog(
      <BeneficiaryRemoveSuccess
        individualAccountId={individualAccount.id ?? ''}
        beneficiaryAccountValue={accountStats?.accountValue ?? ''}
        onClose={handleDialogClose}
      />,
      { showLogo: true, header: <HeaderWithLogo onClose={handleDialogClose} /> },
    );
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
          {isLoading ? <Loader /> : <StyledText variant="dividend">{accountStats?.accountValue}</StyledText>}
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
