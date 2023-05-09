import React from 'react';
import { View } from 'react-native';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { Row } from '../../../components/Containers/Row';
import { FormDisclaimer } from '../../../components/FormDisclaimer';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { palette } from '../../../constants/theme';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';
import { styles } from './styles';

export const RecurringDepositSchedule: StepParams<InvestFormFields> = {
  identifier: Identifiers.RECURRING_DEPOSIT_SCHEDULE,
  doesMeetConditionFields: fields => {
    const requiredFields = allRequiredFieldsExists([
      fields.recurringInvestment?.interval,
      fields.recurringInvestment?.recurringAmount,
      fields.isRecurringInvestment,
    ]);

    return !!fields.isRecurringInvestment && requiredFields;
  },

  Component: ({ moveToNextStep, storeFields }: StepComponentProps<InvestFormFields>) => {
    const handleContinue = async () => {
      moveToNextStep();
    };

    return (
      <>
        <PaddedScrollView>
          <Box py={'24'}>
            <StyledText variant={'h5'}>Recurring Deposit Schedule</StyledText>
          </Box>
          <Box>
            <SummaryDetail
              label="From"
              value={storeFields.source}
            />
            <SummaryDetail
              label="Frequency"
              value={storeFields.recurringInvestment?.interval || 'Weekly: Monday'}
            />
            <SummaryDetail
              label="Starting on "
              value={storeFields.recurringInvestment?.startDate || 'Monday: March 1'}
            />
            <SummaryDetail
              isLast
              label="Amount"
              value={`$${storeFields.recurringInvestment?.recurringAmount || 10000}`}
            />
          </Box>
          <FormDisclaimer>This transaction should take 3-5 business days to complete.</FormDisclaimer>
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

const SummaryDetail = ({ label, value, isLast }: { label: string; value: string; isLast?: boolean }) => {
  return (
    <Row
      py="16"
      justifyContent="space-between"
      style={[!isLast && { borderBottomWidth: 1, borderBottomColor: palette.lightGray }]}
    >
      <StyledText variant={'paragraphLarge'}>{label}</StyledText>
      <StyledText variant={'paragraphEmp'}>{value}</StyledText>
    </Row>
  );
};
