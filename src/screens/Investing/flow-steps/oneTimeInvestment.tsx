import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { generateInvestmentSchema } from 'reinvest-app-common/src/form-schemas/investment';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateInvestment } from 'reinvest-app-common/src/services/queries/createInvestment';
import { AccountType } from 'reinvest-app-common/src/types/graphql';
import { ZodError } from 'zod';

import { InvestingAmountTable } from '../ components/InvestingAmountTable';
import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { ErrorMessagesHandler } from '../../../components/ErrorMessagesHandler';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { investingHeadlines } from '../../../constants/strings';
import { useCurrentAccount } from '../../../hooks/useActiveAccount';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';
import { styles } from './styles';

export const OneTimeInvestment: StepParams<InvestFormFields> = {
  identifier: Identifiers.ONE_TIME_INVESTMENT,
  doesMeetConditionFields: fields => {
    return !!(fields.accountId && fields.accountType);
  },

  Component: ({
    moveToNextStep,
    storeFields: { bankAccount, investAmount, accountId, accountType, initialInvestment },
    updateStoreFields,
  }: StepComponentProps<InvestFormFields>) => {
    const { activeAccount } = useCurrentAccount();
    const schema = useMemo(() => generateInvestmentSchema({ accountType: activeAccount?.type || undefined }), [activeAccount]);
    const [amount, setAmount] = useState<number | undefined>(investAmount);
    const { mutateAsync, isLoading, error: createAccountError } = useCreateInvestment(getApiClient);
    const [error, setError] = useState<string | undefined>();

    const validateInput = () => {
      const result = schema.safeParse({ amount });

      if ('error' in result && result.error instanceof ZodError) {
        setError((result.error as ZodError).issues[0]?.message);

        return false;
      }

      return true;
    };

    const onSubmit = async () => {
      if (validateInput()) {
        const investmentId = await mutateAsync({ amount: { value: amount }, accountId });
        await updateStoreFields({ investAmount: amount, oneTimeInvestmentId: investmentId });
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
            <StyledText variant="h5">{initialInvestment ? investingHeadlines.oneTime.initial : investingHeadlines.oneTime.regular} </StyledText>
          </Box>
          {createAccountError && <ErrorMessagesHandler error={createAccountError} />}
          <InvestingAmountTable
            accountType={accountType || AccountType.Individual}
            error={error}
            amount={amount}
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
            isLoading={isLoading}
            onPress={onSubmit}
            disabled={isLoading}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
