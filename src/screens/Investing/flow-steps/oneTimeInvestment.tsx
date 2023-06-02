import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { INVESTMENT_PRESET_AMOUNTS } from 'reinvest-app-common/src/constants/investment-amounts';
import { generateInvestmentSchema } from 'reinvest-app-common/src/form-schemas/investment';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateInvestment } from 'reinvest-app-common/src/services/queries/createInvestment';
import { useGetActiveRecurringInvestment } from 'reinvest-app-common/src/services/queries/getActiveRecurringInvestment';
import { AccountType, RecurringInvestmentStatus } from 'reinvest-app-common/src/types/graphql';
import { ZodError } from 'zod';

import { InvestingAmountTable } from '../ components/InvestingAmountTable';
import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { ErrorMessagesHandler } from '../../../components/ErrorMessagesHandler';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { investingHeadlines } from '../../../constants/strings';
import { useCurrentAccountConfig } from '../../../hooks/useActiveAccountConfig';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
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
    const presets = INVESTMENT_PRESET_AMOUNTS[accountType ?? AccountType.Individual];

    const { navigate } = useLogInNavigation();
    const schema = useMemo(() => generateInvestmentSchema({ accountType: accountType || AccountType.Individual }), [accountType]);
    const [amount, setAmount] = useState<number | undefined>(investAmount ?? +(presets[0]?.value ?? 0));
    const { mutateAsync, isLoading, error: createAccountError } = useCreateInvestment(getApiClient);
    const { refetch: refetchConfig, isLoading: configRefetching } = useCurrentAccountConfig(accountId);
    const { refetch: refetchActiveRecurring, isLoading: activeRecurringRefetching } = useGetActiveRecurringInvestment(getApiClient, {
      accountId,
    });

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
      if (!amount) return;

      if (validateInput()) {
        const investmentId = await mutateAsync({ amount: { value: amount * 100 }, accountId });
        const { data: config } = await refetchConfig();
        const { data: activeRecurring } = await refetchActiveRecurring();
        await updateStoreFields({
          investAmount: amount,
          oneTimeInvestmentId: investmentId,
          automaticDividendReinvestmentAgreement: config?.automaticDividendReinvestmentAgreement?.signed,
          _shouldDisplayRecurringInvestment: activeRecurring?.status !== RecurringInvestmentStatus.Active,
        });
        moveToNextStep();
      }
    };

    const handleSkip = async () => {
      const { data: activeRecurring } = await refetchActiveRecurring();

      if (activeRecurring?.status === RecurringInvestmentStatus.Active) {
        return navigate(Screens.BottomNavigator, { screen: Screens.Dashboard });
      }

      await updateStoreFields({
        _shouldDisplayRecurringInvestment: true,
      });
      moveToNextStep();
    };

    const isRefetchingData = configRefetching || activeRecurringRefetching;

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
            presetAmounts={presets}
            accountId={accountId}
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
            disabled={isRefetchingData}
          >
            Skip
          </Button>
          <Button
            isLoading={isLoading}
            onPress={onSubmit}
            disabled={isLoading || !amount || isRefetchingData}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
