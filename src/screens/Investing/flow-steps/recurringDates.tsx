import React from 'react';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { Button } from '../../../components/Button';
import { Calendar } from '../../../components/Calendar';
import { Box } from '../../../components/Containers/Box/Box';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';
import { styles } from './styles';

export const RecurringDates: StepParams<InvestFormFields> = {
  identifier: Identifiers.RECURRING_DATES,

  doesMeetConditionFields: fields => {
    return !!fields.isRecurringInvestment && !!fields.recurringInvestment?.interval;
    // && !!fields.recurringInvestment?.recurringAmount;
  },
  Component: ({ moveToNextStep, updateStoreFields, storeFields }: StepComponentProps<InvestFormFields>) => {
    const handleContinue = async () => {
      await updateStoreFields({ recurringInvestment: { ...storeFields.recurringInvestment, endDate: '', startDate: '' } });
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
          <Calendar
            autoSelectionPeriod={'WEEKLY'}
            onSelect={date => {
              // eslint-disable-next-line no-console
              console.log(date);
            }}
          />
        </PaddedScrollView>
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
