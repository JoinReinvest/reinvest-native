import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { RECURRING_INVESTMENT_PRESET_AMOUNTS } from 'reinvest-app-common/src/constants/investment-amounts';
import { generateRecurringInvestmentSchema } from 'reinvest-app-common/src/form-schemas/investment';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { AccountType } from 'reinvest-app-common/src/types/graphql';
import { ZodError } from 'zod';

import { InvestingAmountTable } from '../ components/InvestingAmountTable';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { investingHeadlines } from '../../../constants/strings';
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
    storeFields: { recurringInvestment, accountType, oneTimeInvestmentId, bankAccount, accountId },
    updateStoreFields,
  }: StepComponentProps<InvestFormFields>) => {
    const presets = RECURRING_INVESTMENT_PRESET_AMOUNTS[accountType ?? AccountType.Individual];
    const [error, setError] = useState<string | undefined>();
    const [amount, setAmount] = useState<number | undefined>(recurringInvestment?.recurringAmount ?? +(presets[0]?.value ?? 0));
    const { goBack } = useLogInNavigation();
    const { resetStoreFields } = useInvestFlow();
    const schema = useMemo(() => generateRecurringInvestmentSchema({ accountType: accountType || undefined }), [accountType]);

    const validateInput = () => {
      const result = schema.safeParse({ amount });

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

      await updateStoreFields({ recurringInvestment: undefined, isRecurringInvestment: false });

      moveToNextStep();
    };

    return (
      <>
        <PaddedScrollView>
          <Box
            pt="24"
            pb="16"
          >
            <StyledText variant="h5">{investingHeadlines.recurring}</StyledText>
          </Box>
          <InvestingAmountTable
            presetAmounts={presets}
            isRecurring
            accountId={accountId}
            error={error}
            amount={amount}
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
