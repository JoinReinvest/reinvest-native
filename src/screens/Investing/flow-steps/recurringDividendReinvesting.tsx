import React from 'react';
import { Alert, View } from 'react-native';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FormDisclaimer } from '../../../components/FormDisclaimer';
import { FormModalDisclaimer } from '../../../components/Modals/ModalContent/FormModalDisclaimer';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { InvestingDisclaimers } from '../../../constants/strings';
import { useDialog } from '../../../providers/DialogProvider';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';
import { styles } from './styles';

const { headline, content } = InvestingDisclaimers.whatIsAutomaticDividendReinvesting;
export const RecurringDividendReinvesting: StepParams<InvestFormFields> = {
  identifier: Identifiers.RECURRING_DIVIDEND_REINVESTING,
  doesMeetConditionFields: fields => {
    const requiredFields = allRequiredFieldsExists([
      fields.recurringInvestment?.interval,
      fields.recurringInvestment?.recurringAmount,
      fields.isRecurringInvestment,
    ]);

    return !!fields.isRecurringInvestment && requiredFields;
  },

  Component: ({ moveToNextStep }: StepComponentProps<InvestFormFields>) => {
    const { openDialog } = useDialog();
    const handleSkip = async () => {
      moveToNextStep();
    };

    const handleOptIn = () => {
      Alert.alert('Reinvesting dividend', 'Your dividends will be automatically reinvested', [{ text: 'OK', onPress: moveToNextStep }]);
    };

    const showInfo = () => {
      openDialog(
        <FormModalDisclaimer
          headline={headline}
          content={content}
        />,
      );
    };

    return (
      <>
        <PaddedScrollView>
          <Box py={'24'}>
            <StyledText variant={'h5'}>Opt in for automatic dividend reinvesting?</StyledText>
          </Box>
          <FormDisclaimer>
            <StyledText
              variant="link"
              onPress={showInfo}
            >
              What is automatic dividend reinvesting?
            </StyledText>
          </FormDisclaimer>
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            variant="outlined"
            onPress={handleSkip}
          >
            Skip
          </Button>
          <Button onPress={handleOptIn}>Opt In</Button>
        </View>
      </>
    );
  },
};
