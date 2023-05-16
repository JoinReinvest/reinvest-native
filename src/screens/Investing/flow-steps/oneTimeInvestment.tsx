import React, { useState } from 'react';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateInvestment } from 'reinvest-app-common/src/services/queries/createInvestment';

import { InvestingAmountTable } from '../ components/InvestingAmountTable';
import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { ErrorMessagesHandler } from '../../../components/ErrorMessagesHandler';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';
import { styles } from './styles';

export const OneTimeInvestment: StepParams<InvestFormFields> = {
  identifier: Identifiers.ONE_TIME_INVESTMENT,

  Component: ({ moveToNextStep, storeFields: { bankAccount, investAmount, accountId }, updateStoreFields }: StepComponentProps<InvestFormFields>) => {
    const [amount, setAmount] = useState<string | undefined>(investAmount);
    const { mutateAsync, isLoading, error } = useCreateInvestment(getApiClient);

    const handleContinue = async () => {
      const investmentId = await mutateAsync({ amount: { value: amount }, accountId });
      await updateStoreFields({ investAmount: amount, oneTimeInvestmentId: investmentId });
      moveToNextStep();
    };

    const handleSkip = () => {
      moveToNextStep();
    };
    const shouldButtonBeDisabled = isLoading || !!error || !amount?.length;

    return (
      <>
        <PaddedScrollView>
          <Box
            pt="24"
            pb="16"
          >
            <StyledText variant="h5">Make your initial one-time investment </StyledText>
          </Box>
          {error && <ErrorMessagesHandler error={error} />}
          <InvestingAmountTable
            amount={amount}
            bankAccount={bankAccount?.accountNumber || ''}
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
            isLoading={isLoading}
            onPress={handleContinue}
            disabled={shouldButtonBeDisabled}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
