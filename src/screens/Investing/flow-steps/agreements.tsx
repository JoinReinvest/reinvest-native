import React, { useState } from 'react';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateSubscriptionAgreement } from 'reinvest-app-common/src/services/queries/createSubscriptionAgreement';
import { useSignSubscriptionAgreement } from 'reinvest-app-common/src/services/queries/signSubscriptionAgreement';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { ErrorMessagesHandler } from '../../../components/ErrorMessagesHandler';
import { FormModalDisclaimer } from '../../../components/Modals/ModalContent/FormModalDisclaimer';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { RadioButton } from '../../../components/RadioButton';
import { StyledText } from '../../../components/typography/StyledText';
import { InvestingDisclaimers } from '../../../constants/strings';
import { useDialog } from '../../../providers/DialogProvider';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';
import { styles } from './styles';

export const Agreements: StepParams<InvestFormFields> = {
  identifier: Identifiers.AGREEMENTS,

  Component: ({ moveToNextStep, storeFields }: StepComponentProps<InvestFormFields>) => {
    const { openDialog } = useDialog();
    const { oneTimeInvestmentId, isRecurringInvestment } = storeFields;
    const [agreements, setAgreements] = useState({ oneTimeAgreement: false, recurringAgreement: false });
    const { mutateAsync: createAgreement, isLoading: createSubscriptionLoading, error: createSubscriptionError } = useCreateSubscriptionAgreement(getApiClient);
    const { mutateAsync: signInAgreement, isLoading: signInAgreementLoading, error: signInAgreementError } = useSignSubscriptionAgreement(getApiClient);
    const handleAccept = async () => {
      if (oneTimeInvestmentId && agreements.oneTimeAgreement) {
        const { id: subscriptionAgreementId } = await createAgreement({ investmentId: oneTimeInvestmentId });
        await signInAgreement({ subscriptionAgreementId });
      }

      if (isRecurringInvestment && agreements.recurringAgreement) {
      }

      moveToNextStep();
    };

    const handleSelect = (variant: 'oneTimeAgreement' | 'recurringAgreement') => {
      setAgreements(prev => ({ ...prev, [variant]: !prev[variant] }));
    };
    const showAgreement = (variant: 'oneTimeAgreement' | 'recurringAgreement') => {
      const { headline, content } = InvestingDisclaimers[variant];
      openDialog(
        <FormModalDisclaimer
          headline={headline}
          content={content}
        />,
      );
    };

    const loading = createSubscriptionLoading || signInAgreementLoading;
    const shouldButtonBeDisabled = (!!oneTimeInvestmentId && !agreements.oneTimeAgreement) || (isRecurringInvestment && !agreements.recurringAgreement);

    return (
      <>
        <PaddedScrollView>
          <Box pt={'24'}>
            <StyledText variant="h5">Approve subscription agreements</StyledText>
          </Box>
          {createSubscriptionError && <ErrorMessagesHandler error={createSubscriptionError} />}
          {signInAgreementError && <ErrorMessagesHandler error={signInAgreementError} />}
          <Box py={'16'}>
            <StyledText variant="paragraphLarge">I have read through the selected documents referenced below:</StyledText>
          </Box>
          {storeFields.oneTimeInvestmentId && (
            <RadioButton
              radioStyles={styles.agreementsRadioStyles}
              value={'oneTimeAgreement'}
              checked={agreements.oneTimeAgreement}
              onPress={handleSelect}
            >
              <StyledText
                variant="link"
                onPress={() => showAgreement('oneTimeAgreement')}
              >
                One Time Investment Agreement
              </StyledText>
            </RadioButton>
          )}
          {!!storeFields.recurringInvestment && (
            <RadioButton
              radioStyles={styles.agreementsRadioStyles}
              value={'recurringAgreement'}
              checked={agreements.recurringAgreement}
              onPress={handleSelect}
            >
              <StyledText
                variant="link"
                onPress={() => showAgreement('recurringAgreement')}
              >
                Recurring Investment Agreement
              </StyledText>
            </RadioButton>
          )}
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            disabled={shouldButtonBeDisabled}
            onPress={handleAccept}
            isLoading={loading}
          >
            Accept
          </Button>
        </View>
      </>
    );
  },
};
