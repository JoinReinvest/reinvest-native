import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
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

  Component: ({ moveToNextStep }: StepComponentProps<InvestFormFields>) => {
    const { openDialog } = useDialog();
    const [agreements, setAgreements] = useState({ oneTimeAgreement: false, recurringAgreement: false });

    const handleAccept = () => {
      Alert.alert('Reinvesting dividend', 'Your dividends will be automatically reinvested', [{ text: 'OK', onPress: moveToNextStep }]);
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

    return (
      <>
        <PaddedScrollView>
          <Box pt={'24'}>
            <StyledText variant="h5">Approve subscription agreements</StyledText>
          </Box>
          <Box py={'16'}>
            <StyledText variant="paragraphLarge">I have read through the selected documents referenced below:</StyledText>
          </Box>
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
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            disabled={!agreements.oneTimeAgreement || !agreements.recurringAgreement}
            onPress={handleAccept}
          >
            Accept
          </Button>
        </View>
      </>
    );
  },
};
