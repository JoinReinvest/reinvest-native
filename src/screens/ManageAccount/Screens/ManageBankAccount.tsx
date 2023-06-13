import React from 'react';
import { useReadBankAccount } from 'reinvest-app-common/src/services/queries/readBankAccount';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { Loader } from '../../../components/Loader';
import { MainWrapper } from '../../../components/MainWrapper';
import { ConfirmDelete } from '../../../components/Modals/ModalContent/ConfirmDelete';
import { StyledText } from '../../../components/typography/StyledText';
import { useCurrentAccount } from '../../../hooks/useActiveAccount';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { useDialog } from '../../../providers/DialogProvider';

export const ManageBankAccount = () => {
  const { activeAccount } = useCurrentAccount();
  const { navigate } = useLogInNavigation();
  const { openDialog } = useDialog();

  const { data, isLoading } = useReadBankAccount(getApiClient, { accountId: activeAccount.id || '' });

  const openConfirmDialog = () =>
    openDialog(
      <ConfirmDelete
        heading="Are you sure you want to change the bank account?"
        onSuccess={() => navigate(Screens.BankAccount, { accountId: activeAccount.id || '', isUpdatingAccount: !!data?.accountNumber })}
      />,
      undefined,
      'sheet',
    );

  return (
    <MainWrapper bottomSafe>
      <Box
        flex={1}
        fw
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <StyledText variant="paragraphEmp">{`${data?.accountType} ${data?.accountNumber}`} </StyledText>
            <Box pt="16">
              <StyledText variant="paragraph">
                {`REINVEST allows only 1 bank account to be linked to an account at a time. \n \n If you remove your bank account, it will be removed from your beneficiary account as well.`}
              </StyledText>
            </Box>
          </>
        )}
      </Box>
      <Button onPress={openConfirmDialog}>Change</Button>
    </MainWrapper>
  );
};
