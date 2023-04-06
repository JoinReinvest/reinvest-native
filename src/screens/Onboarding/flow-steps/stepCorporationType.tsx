import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { CORPORATION_TYPES_AS_OPTIONS } from 'reinvest-app-common/src/constants/account-types';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { CorporateCompanyType } from 'reinvest-app-common/src/types/graphql';

import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { FormModalDisclaimer } from '../../../components/Modals/ModalContent/FormModalDisclaimer';
import { ProgressBar } from '../../../components/ProgressBar';
import { StyledText } from '../../../components/typography/StyledText';
import { onBoardingDisclaimers } from '../../../constants/strings';
import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

export const StepCorporationType: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATION_TYPE,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const [selectedCorporationType, setSelectedCorporationType] = useState<CorporateCompanyType | undefined>(storeFields.corporationType);
    const { openDialog } = useDialog();

    const handleContinue = () => {
      updateStoreFields({ corporationType: selectedCorporationType });
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
        <ScrollView style={styles.fw}>
          <FormTitle
            dark
            headline="What type of Corporation do you have?"
          />
          <View style={styles.cardsWrapper}>
            {CORPORATION_TYPES_AS_OPTIONS.map(({ title, value, description }) => (
              <Card
                selected={value === selectedCorporationType}
                key={value}
                id={value}
                value={value as CorporateCompanyType}
                title={title}
                description={description}
                onCardPress={setSelectedCorporationType}
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
        </ScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            onPress={handleContinue}
            disabled={!selectedCorporationType}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
