import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateRecurringSubscriptionAgreement } from 'reinvest-app-common/src/services/queries/createRecurringSubscriptionAgreement';
import { useCreateSubscriptionAgreement } from 'reinvest-app-common/src/services/queries/createSubscriptionAgreement';
import { useSignRecurringInvestmentSubscriptionAgreement } from 'reinvest-app-common/src/services/queries/signRecurringInvestmentSubscriptionAgreement';
import { useSignSubscriptionAgreement } from 'reinvest-app-common/src/services/queries/signSubscriptionAgreement';
import { SubscriptionAgreement } from 'reinvest-app-common/src/types/graphql';

import { AgreementDetails } from '../ components/AgreementDocument';
import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { ErrorMessagesHandler } from '../../../components/ErrorMessagesHandler';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { RadioButton } from '../../../components/RadioButton';
import { StyledText } from '../../../components/typography/StyledText';
import { useDialog } from '../../../providers/DialogProvider';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';
import { styles } from './styles';

type AgreementType = 'oneTimeAgreement' | 'recurringAgreement';
export const Agreements: StepParams<InvestFormFields> = {
  identifier: Identifiers.AGREEMENTS,

  Component: ({ moveToNextStep, storeFields }: StepComponentProps<InvestFormFields>) => {
    const { openDialog } = useDialog();
    const { oneTimeInvestmentId, isRecurringInvestment, accountId, recurringInvestmentId } = storeFields;
    const [agreements, setAgreements] = useState({ oneTimeAgreement: false, recurringAgreement: false });
    const { mutateAsync: createAgreement, isLoading: createSubscriptionLoading, error: createSubscriptionError } = useCreateSubscriptionAgreement(getApiClient);
    const {
      mutateAsync: createRecurringAgreement,
      isLoading: createRecurringLoading,
      error: createRecurringError,
    } = useCreateRecurringSubscriptionAgreement(getApiClient);
    const { mutateAsync: signInAgreement, isLoading: signInAgreementLoading, error: signInAgreementError } = useSignSubscriptionAgreement(getApiClient);
    const {
      mutateAsync: signInRecurring,
      isLoading: signInRecurringLoading,
      error: signInRecurringError,
    } = useSignRecurringInvestmentSubscriptionAgreement(getApiClient);
    const [agreementsDocs, setAgreementsDocs] = useState<Partial<Record<AgreementType, SubscriptionAgreement>>>({});
    const handleAccept = async () => {
      if (oneTimeInvestmentId && agreements.oneTimeAgreement) {
        await signInAgreement({ investmentId: oneTimeInvestmentId });
      }

      if (isRecurringInvestment && agreements.recurringAgreement) {
        await signInRecurring({ accountId });
      }

      moveToNextStep();
    };

    const handleSelect = (variant: AgreementType) => {
      setAgreements(prev => ({ ...prev, [variant]: !prev[variant] }));
    };
    const showAgreement = (variant: AgreementType) => {
      const agreement = agreementsDocs[variant];

      if (agreement) {
        openDialog(<AgreementDetails agreement={agreement} />);
      }
    };

    useEffect(() => {
      if (oneTimeInvestmentId && !agreementsDocs.recurringAgreement) {
        (async () => {
          const agreement = await createAgreement({ investmentId: oneTimeInvestmentId });

          if (agreement) {
            setAgreementsDocs(prev => ({ ...prev, oneTimeAgreement: agreement }));
          }
        })();
      }

      if (recurringInvestmentId && !agreementsDocs.recurringAgreement) {
        (async () => {
          const agreement = await createRecurringAgreement({ accountId });

          if (agreement) {
            setAgreementsDocs(prev => ({ ...prev, recurringAgreement: agreement }));
          }
        })();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loading = createSubscriptionLoading || signInAgreementLoading || createRecurringLoading || signInRecurringLoading;
    const shouldButtonBeDisabled = (!!oneTimeInvestmentId && !agreements.oneTimeAgreement) || (isRecurringInvestment && !agreements.recurringAgreement);

    return (
      <>
        <PaddedScrollView>
          <Box pt={'24'}>
            <StyledText variant="h5">Approve subscription agreements</StyledText>
          </Box>
          {createSubscriptionError && <ErrorMessagesHandler error={createSubscriptionError} />}
          {signInAgreementError && <ErrorMessagesHandler error={signInAgreementError} />}
          {createRecurringError && <ErrorMessagesHandler error={createRecurringError} />}
          {signInRecurringError && <ErrorMessagesHandler error={signInRecurringError} />}
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
