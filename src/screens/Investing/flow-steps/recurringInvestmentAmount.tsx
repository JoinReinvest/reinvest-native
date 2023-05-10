import React, { useState } from 'react';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { InvestingAmountTable } from '../ components/InvestingAmountTable';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { useLogInNavigation } from '../../../navigation/hooks';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';
import { useInvestFlow } from './index';
import { styles } from './styles';

export const RecurringAmount: StepParams<InvestFormFields> = {
  identifier: Identifiers.RECURRING_AMOUNT_INVESTMENT,
  doesMeetConditionFields: fields => {
    return !!fields.isRecurringInvestment;
  },

  Component: ({ moveToNextStep, storeFields, updateStoreFields }: StepComponentProps<InvestFormFields>) => {
    const [amount, setAmount] = useState<string | undefined>(storeFields.recurringInvestment?.recurringAmount);
    const { goBack } = useLogInNavigation();
    const { resetStoreFields } = useInvestFlow();
    const handleContinue = async () => {
      if (amount) {
        await updateStoreFields({ recurringInvestment: { ...storeFields.recurringInvestment, recurringAmount: amount } });
        moveToNextStep();
      }
    };

    const handleSkip = async () => {
      /*
       * in case no option is selected for either onetime and recurring we should dismiss investment screen
       */
      if (!storeFields.oneTimeInvestmentId) {
        await resetStoreFields();
        goBack();
      }

      moveToNextStep();
    };

    return (
      <>
        <PaddedScrollView>
          <Box
            pt="24"
            pb="16"
          >
            <StyledText variant="h5">How often would you like to have a recurring investment?</StyledText>
          </Box>
          <InvestingAmountTable
            amount={amount}
            bankAccount={storeFields.bankAccount?.accountNumber || ''}
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
