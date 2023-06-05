import React from 'react';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useReadBankAccount } from 'reinvest-app-common/src/services/queries/readBankAccount';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { StatusCircle } from '../../../components/StatusCircle';
import { StyledText } from '../../../components/typography/StyledText';
import { useLogInNavigation } from '../../../navigation/hooks';
import { Identifiers } from '../identifiers';
import { BankAccountFormFields } from '../types';
import { styles } from './styles';

export const BankAccountConfirmed: StepParams<BankAccountFormFields> = {
  identifier: Identifiers.BANK_ACCOUNT_CONFIRMED,

  Component: ({ storeFields: { accountId } }: StepComponentProps<BankAccountFormFields>) => {
    const { pop } = useLogInNavigation();
    const { data } = useReadBankAccount(getApiClient, { accountId: accountId || '' });
    const handleContinue = async () => {
      pop();
    };

    return (
      <>
        <Box
          px="default"
          flex={1}
          pt="24"
        >
          <StatusCircle
            variant="success"
            fillColor="lightGray"
            justifyContent="flex-start"
          >
            <Box py="8">
              <StyledText variant={'h5'}>{`Your bank account ending in ${data?.accountNumber} has been added.`} </StyledText>
            </Box>
          </StatusCircle>
        </Box>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button onPress={handleContinue}>Continue</Button>
        </View>
      </>
    );
  },
};
