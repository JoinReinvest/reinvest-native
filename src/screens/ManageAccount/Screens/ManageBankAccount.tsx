import React from 'react';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { useCurrentAccount } from '../../../hooks/useActiveAccount';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';

export const ManageBankAccount = () => {
  const { activeAccount } = useCurrentAccount();
  const { navigate } = useLogInNavigation();

  const onPress = async () => {
    navigate(Screens.BankAccount, { accountId: activeAccount.id || '', sourceScreen: Screens.ManageAccount });
  };

  return (
    <>
      <PaddedScrollView></PaddedScrollView>
      <Box
        px="default"
        fw
      >
        <Button onPress={onPress}>Edit Bank Account</Button>
      </Box>
    </>
  );
};
