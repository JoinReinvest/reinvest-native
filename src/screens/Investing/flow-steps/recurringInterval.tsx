import React, { useState } from 'react';
import { View } from 'react-native';
import { RECURRING_INVESTMENT_INTERVALS } from 'reinvest-app-common/src/constants/recurring-investment-intervals';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { RecurringInvestmentFrequency } from 'reinvest-app-common/src/types/graphql';

import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { Box } from '../../../components/Containers/Box/Box';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';
import { styles } from './styles';

export const RecurringInterval: StepParams<InvestFormFields> = {
  identifier: Identifiers.RECURRING_INTERVAL,
  willBePartOfTheFlow: fields => !!fields._shouldDisplayRecurringInvestment,

  doesMeetConditionFields: fields => {
    return !!fields.isRecurringInvestment;
  },
  Component: ({ moveToNextStep, updateStoreFields, storeFields }: StepComponentProps<InvestFormFields>) => {
    const [selectedInterval, setInterval] = useState<RecurringInvestmentFrequency | undefined>(storeFields.recurringInvestment?.interval);
    const handleContinue = async () => {
      if (selectedInterval) {
        await updateStoreFields({ recurringInvestment: { ...storeFields.recurringInvestment, interval: selectedInterval } });
        moveToNextStep();
      }
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
          {RECURRING_INVESTMENT_INTERVALS.map(({ title, value }) => (
            <Box
              pt={'16'}
              key={value}
            >
              <Card<RecurringInvestmentFrequency>
                dark={false}
                compact
                selected={value === selectedInterval}
                id={value}
                value={value as RecurringInvestmentFrequency}
                title={title}
                onCardPress={setInterval}
              />
            </Box>
          ))}
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            onPress={handleContinue}
            disabled={!selectedInterval}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
