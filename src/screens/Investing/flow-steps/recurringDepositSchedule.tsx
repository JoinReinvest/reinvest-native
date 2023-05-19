import React from 'react';
import { View } from 'react-native';
import { RECURRING_INVESTMENT_INTERVAL_LABELS, RecurringInvestmentInterval } from 'reinvest-app-common/src/constants/recurring-investment-intervals';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetDraftRecurringInvestment } from 'reinvest-app-common/src/services/queries/getDraftRecurringInvestment';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { Row } from '../../../components/Containers/Row';
import { FormDisclaimer } from '../../../components/FormDisclaimer';
import { Loader } from '../../../components/Loader';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { palette } from '../../../constants/theme';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';
import { styles } from './styles';

export const RecurringDepositSchedule: StepParams<InvestFormFields> = {
  identifier: Identifiers.RECURRING_DEPOSIT_SCHEDULE,
  willBePartOfTheFlow: fields => fields._shouldDisplayRecurringInvestment,
  doesMeetConditionFields: fields => {
    const requiredFields = allRequiredFieldsExists([
      fields.recurringInvestment?.interval,
      fields.recurringInvestment?.recurringAmount,
      fields.isRecurringInvestment,
    ]);

    return !!fields.isRecurringInvestment && requiredFields;
  },

  Component: ({ moveToNextStep, storeFields: { recurringInvestment, bankAccount, source, accountId } }: StepComponentProps<InvestFormFields>) => {
    const { data, isLoading } = useGetDraftRecurringInvestment(getApiClient, { accountId });
    const handleContinue = async () => {
      moveToNextStep();
    };

    if (isLoading) {
      return (
        <Box
          fw
          fh
        >
          <Loader />
        </Box>
      );
    }

    return (
      <>
        <PaddedScrollView>
          <Box py={'24'}>
            <StyledText variant={'h5'}>Recurring Deposit Schedule</StyledText>
          </Box>
          {data && (
            <Box>
              <SummaryDetail
                label="From"
                value={`${source}\n${bankAccount?.accountNumber || ''}`}
              />
              <SummaryDetail
                label="Frequency"
                value={`${RECURRING_INVESTMENT_INTERVAL_LABELS.get(recurringInvestment?.interval || RecurringInvestmentInterval.WEEKLY)}: ${formatDate(
                  data?.schedule.startDate,
                  'INVESTMENT_FREQUENCY_LONG',
                  {
                    currentFormat: 'API',
                  },
                )}`}
              />
              <SummaryDetail
                label="Starting on "
                value={formatDate(data.schedule.startDate, 'INVESTMENT_RECURRENT', { currentFormat: 'DEFAULT' })}
              />
              <SummaryDetail
                isLast
                label="Amount"
                value={data.amount.formatted as string}
              />
            </Box>
          )}
          <FormDisclaimer>This transaction should take 3-5 business days to complete.</FormDisclaimer>
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            disabled={!data}
            onPress={handleContinue}
          >
            Continue
          </Button>
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
      <StyledText
        textAlign="right"
        variant="paragraphLarge"
      >
        {label}
      </StyledText>
      <StyledText variant={'paragraphEmp'}>{value}</StyledText>
    </Row>
  );
};
