import { FormModalDisclaimer } from '@components/Modals/ModalContent/FormModalDisclaimer';
import { onBoardingDisclaimers } from '@constants/strings';
import { useDialog } from '@providers/DialogProvider';
import { Button } from '@src/components/Button';
import { Card } from '@src/components/Card';
import { FormTitle } from '@src/components/Forms/FormTitle';
import { ProgressBar } from '@src/components/ProgressBar';
import { StyledText } from '@src/components/typography/StyledText';
import { ACCOUNT_TYPES, AccountTypeValue } from '@src/constants/account-types';
import { palette } from '@src/constants/theme';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

export const StepAccountType: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.ACCOUNT_TYPE,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const [selectedAccountType, setSelectedAccountType] = useState<AccountTypeValue | undefined>(storeFields.accountType);
    const { openDialog } = useDialog();

    const handleContinue = () => {
      updateStoreFields({ accountType: selectedAccountType });
      moveToNextStep();
    };

    const openDisclaimer = () =>
      openDialog(
        <FormModalDisclaimer
          headline={'Account types'}
          content={onBoardingDisclaimers.notSureWhichBestForYou}
        />,
      );

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <ScrollView style={styles.fw}>
          <FormTitle
            dark
            headline="Which type of account would you like to open?"
          />
          <View style={styles.cardsWrapper}>
            {ACCOUNT_TYPES.map(account => (
              <Card
                selected={account.value === selectedAccountType}
                key={account.value}
                id={account.value}
                title={account.label}
                onCardPress={setSelectedAccountType}
              >
                {account.description}
              </Card>
            ))}
          </View>
          <StyledText
            style={styles.link}
            color={palette.frostGreen}
            variant="link"
            onPress={openDisclaimer}
          >
            Not sure which is best for you?
          </StyledText>
        </ScrollView>
        <View
          key={'buttons_section'}
          style={styles.buttonsSection}
        >
          <Button
            onPress={handleContinue}
            disabled={!selectedAccountType}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
