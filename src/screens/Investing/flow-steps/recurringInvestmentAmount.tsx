import React, { useState } from 'react';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { InvestingAmountTable } from '../ components/InvestingAmountTable';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';
import { styles } from './styles';

export const RecurringAmount: StepParams<InvestFormFields> = {
  identifier: Identifiers.RECURRING_AMOUNT_INVESTMENT,
  doesMeetConditionFields: fields => {
    return !!fields.isRecurringInvestment;
  },

  Component: ({ moveToNextStep, storeFields, updateStoreFields }: StepComponentProps<InvestFormFields>) => {
    const [amount, setAmount] = useState<string | undefined>(storeFields.recurringInvestment?.recurringAmount);

    const handleContinue = async () => {
      if (amount) {
        await updateStoreFields({ recurringInvestment: { ...storeFields.recurringInvestment, recurringAmount: amount } });
        moveToNextStep();
      }
    };

    const handleSkip = () => {
      moveToNextStep();
    };

    return (
      <>
        <PaddedScrollView>
          <Box
            pt="24"
            pb="16"
          >
            <StyledText variant="h5">Make your initial one-time investment </StyledText>
          </Box>
          <InvestingAmountTable
            amount={amount}
            bankAccount={storeFields.accountNumber}
            setAmount={setAmount}
          />
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            onPress={handleSkip}
            variant={'outlined'}
          >
            Skip
          </Button>
          <Button
            onPress={handleContinue}
            disabled={!amount?.length}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
