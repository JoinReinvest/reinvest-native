import React, { useRef } from 'react';
import { useReadBankAccount } from 'reinvest-app-common/src/services/queries/readBankAccount';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { Loader } from '../../../components/Loader';
import { MainWrapper } from '../../../components/MainWrapper';
import { AccountUpdateConfirmation } from '../../../components/Modals/ModalContent/AccountUpdateConfirmation';
import { HeaderWithLogo } from '../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { StyledText } from '../../../components/typography/StyledText';
import { useCurrentAccount } from '../../../hooks/useActiveAccount';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { useDialog } from '../../../providers/DialogProvider';

export const ManageBankAccount = () => {
  const { activeAccount } = useCurrentAccount();
  const { navigate } = useLogInNavigation();
  const { openDialog } = useDialog();
  const { goBack } = useLogInNavigation();

  const { data, isLoading } = useReadBankAccount(getApiClient, { accountId: activeAccount.id || '' });
  const removedAccountRef = useRef(data?.accountNumber || '');
  const onPress = async () => {
    navigate(Screens.BankAccount, { accountId: activeAccount.id || '', isUpdatingAccount: !!data?.accountNumber });
  };

  const showAccountRemovedDialog = () => {
    openDialog(
      <AccountUpdateConfirmation
        accountNumber={removedAccountRef.current}
        disclaimer="You will need to add an account to make future investments"
      />,
      {
        showLogo: true,
        header: (
          <HeaderWithLogo
            onClose={() => {
              goBack();
            }}
          />
        ),
        closeIcon: false,
      },
    );
  };

  const onRemove = async () => {
    removedAccountRef.current = data?.accountNumber || '';
    setTimeout(() => {
      showAccountRemovedDialog();
    }, 1000);
  };

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

      <Button onPress={onPress}>Change</Button>
      <Button
        disabled={!data}
        isDestructive
        variant="outlined"
        onPress={onRemove}
      >
        Remove
      </Button>
    </MainWrapper>
  );
};
