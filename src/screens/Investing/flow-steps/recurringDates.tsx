import React, { useState } from 'react';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateRecurringInvestment } from 'reinvest-app-common/src/services/queries/createRecurringInvestment';
import { RecurringInvestmentFrequency } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Calendar } from '../../../components/Calendar';
import { Box } from '../../../components/Containers/Box/Box';
import { ErrorMessagesHandler } from '../../../components/ErrorMessagesHandler';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';
import { styles } from './styles';

export const RecurringDates: StepParams<InvestFormFields> = {
  identifier: Identifiers.RECURRING_DATES,
  willBePartOfTheFlow: fields => !!fields._shouldDisplayRecurringInvestment,

  doesMeetConditionFields: fields => {
    return !!fields.isRecurringInvestment && !!fields.recurringInvestment?.interval;
  },
  Component: ({ moveToNextStep, updateStoreFields, storeFields: { accountId, recurringInvestment } }: StepComponentProps<InvestFormFields>) => {
    const [startingDate, setStartingDate] = useState<undefined | string>(recurringInvestment?.startingDate);
    const { mutateAsync: createInvestment, isLoading, error } = useCreateRecurringInvestment(getApiClient);

    const handleContinue = async () => {
      if (recurringInvestment?.interval) {
        const { id, subscriptionAgreementId } = await createInvestment({
          accountId,
          amount: { value: (recurringInvestment?.recurringAmount ?? 0) * 100 },
          schedule: { startDate: startingDate, frequency: recurringInvestment.interval },
        });
        await updateStoreFields({ recurringInvestmentId: id, subscriptionAgreementId });
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
            <StyledText variant="h5">Select your 1st investment date</StyledText>
            <StyledText variant="paragraphLarge">This will repeat on the same day each week.</StyledText>
          </Box>
          {error && <ErrorMessagesHandler error={error} />}
          <Calendar
            defaultStartingDate={recurringInvestment?.startingDate}
            autoSelectionPeriod={recurringInvestment?.interval || RecurringInvestmentFrequency.Weekly}
            onSelect={async selectedData => {
              setStartingDate(selectedData.startingDate);
              await updateStoreFields({ recurringInvestment: { ...recurringInvestment, ...selectedData } });
            }}
          />
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            isLoading={isLoading}
            disabled={!startingDate}
            onPress={handleContinue}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
