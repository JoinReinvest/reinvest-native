import React, { useState } from 'react';
import { View } from 'react-native';
import { TRUST_TYPES_AS_OPTIONS } from 'reinvest-app-common/src/constants/account-types';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DraftAccountType, TrustCompanyType } from 'reinvest-app-common/src/types/graphql';

import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { FormModalDisclaimer } from '../../../components/Modals/ModalContent/FormModalDisclaimer';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { StyledText } from '../../../components/typography/StyledText';
import { onBoardingDisclaimers } from '../../../constants/strings';
import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

export const StepTrustType: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.TRUST_TYPE,

  willBePartOfTheFlow(fields) {
    return fields.accountType === DraftAccountType.Trust;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const [selectedTrustType, setSelectedTrustType] = useState<TrustCompanyType | undefined>(storeFields.trustType);
    const { openDialog } = useDialog();

    const handleContinue = async () => {
      await updateStoreFields({ trustType: selectedTrustType });
      moveToNextStep();
    };

    const openDisclaimer = () =>
      openDialog(
        <FormModalDisclaimer
          headline="Account types"
          content={onBoardingDisclaimers.notSureWhichBestForYou}
        />,
      );

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView style={styles.fw}>
          <FormTitle
            dark
            headline="Which type of account would you like to open?"
          />
          <View style={styles.cardsWrapper}>
            {TRUST_TYPES_AS_OPTIONS.map(({ title, value, description }) => (
              <Card
                selected={value === selectedTrustType}
                key={value}
                id={value}
                value={value as TrustCompanyType}
                title={title}
                description={description}
                onCardPress={setSelectedTrustType}
              />
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
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            onPress={handleContinue}
            disabled={!selectedTrustType}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
