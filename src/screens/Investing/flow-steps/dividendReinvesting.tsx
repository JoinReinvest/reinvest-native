import React from 'react';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useSetAutomaticDividendReinvestmentAgreement } from 'reinvest-app-common/src/services/queries/setAutomaticDividendReinvestmentAgreement';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { ErrorMessagesHandler } from '../../../components/ErrorMessagesHandler';
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
export const DividendReinvesting: StepParams<InvestFormFields> = {
  identifier: Identifiers.DIVIDEND_REINVESTING,
  doesMeetConditionFields: fields => {
    return (!!fields.isRecurringInvestment || !!fields.oneTimeInvestmentId) && !fields.automaticDividendReinvestmentAgreement;
  },

  Component: ({ moveToNextStep, storeFields: { accountId }, updateStoreFields }: StepComponentProps<InvestFormFields>) => {
    const { openDialog } = useDialog();
    const { mutateAsync, isLoading, error } = useSetAutomaticDividendReinvestmentAgreement(getApiClient);
    const handleSkip = async () => {
      moveToNextStep();
    };

    const handleOptIn = async () => {
      await mutateAsync({ accountId, automaticDividendReinvestmentAgreement: true });
      await updateStoreFields({ automaticDividendReinvestmentAgreement: true });
      moveToNextStep();
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
          {error && <ErrorMessagesHandler error={error} />}
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
            disabled={isLoading}
          >
            Skip
          </Button>
          <Button
            onPress={handleOptIn}
            isLoading={isLoading}
          >
            Opt In
          </Button>
        </View>
      </>
    );
  },
};
