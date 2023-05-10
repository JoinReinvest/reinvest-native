import React from 'react';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { StatusCircle } from '../../../components/StatusCircle';
import { StyledText } from '../../../components/typography/StyledText';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';
import { styles } from './styles';

export const BankAccountConfirmed: StepParams<InvestFormFields> = {
  identifier: Identifiers.BANK_ACCOUNT_CONFIRMED,
  doesMeetConditionFields: fields => {
    return !!fields.bankAccount && !!fields.addingAccount;
  },

  Component: ({ moveToNextStep, storeFields: { bankAccount }, updateStoreFields }: StepComponentProps<InvestFormFields>) => {
    const handleContinue = async () => {
      await updateStoreFields({ addingAccount: undefined });
      moveToNextStep();
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
              <StyledText variant={'h5'}>{`Your bank account ending in ${bankAccount?.accountNumber} has been added.`} </StyledText>
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
