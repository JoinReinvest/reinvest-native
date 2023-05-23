import React, { useState } from 'react';
import { View } from 'react-native';
import { recurringInvestmentSchema } from 'reinvest-app-common/src/form-schemas/investment';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { AccountType } from 'reinvest-app-common/src/types/graphql';
import { ZodError } from 'zod';

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
  willBePartOfTheFlow: fields => !!fields._shouldDisplayRecurringInvestment,
  doesMeetConditionFields: fields => {
    return !!fields.isRecurringInvestment;
  },

  Component: ({
    moveToNextStep,
    storeFields: { recurringInvestment, accountType, oneTimeInvestmentId, bankAccount },
    updateStoreFields,
  }: StepComponentProps<InvestFormFields>) => {
    const [error, setError] = useState<string | undefined>();

    const [amount, setAmount] = useState<number | undefined>(recurringInvestment?.recurringAmount);
    const { goBack } = useLogInNavigation();
    const { resetStoreFields } = useInvestFlow();
    const validateInput = () => {
      const result = recurringInvestmentSchema.safeParse({ amount });

      if ('error' in result && result.error instanceof ZodError) {
        setError((result.error as ZodError).issues[0]?.message);

        return false;
      }

      return true;
    };
    const handleContinue = async () => {
      if (amount && validateInput()) {
        await updateStoreFields({ recurringInvestment: { ...recurringInvestment, recurringAmount: amount } });
        moveToNextStep();
      }
    };

    const handleSkip = async () => {
      /*
       * in case no option is selected for either onetime and recurring we should dismiss investment screen
       */

      if (!oneTimeInvestmentId) {
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
            error={error}
            amount={amount}
            type="recurring"
            accountType={accountType || AccountType.Individual}
            bankAccount={bankAccount?.accountNumber || ''}
            setAmount={value => {
              setError(undefined);
              setAmount(parseFloat(value));
            }}
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
            disabled={!amount}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
