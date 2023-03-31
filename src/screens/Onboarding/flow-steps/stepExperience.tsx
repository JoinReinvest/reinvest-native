import { Button } from '@src/components/Button';
import { Card } from '@src/components/Card';
import { FormTitle } from '@src/components/Forms/FormTitle';
import { ProgressBar } from '@src/components/ProgressBar';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { EXPERIENCES_AS_OPTIONS } from 'reinvest-app-common/src/constants/experiences';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { Experience } from 'reinvest-app-common/src/types/graphql';

import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

export const StepExperience: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.EXPERIENCE,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const [selectedExperience, setSelectedExperience] = useState<Experience | undefined>(storeFields.experience);

    const handleContinue = () => {
      updateStoreFields({ experience: selectedExperience });
      moveToNextStep();
    };

    const handleSkip = () => {
      updateStoreFields({ experience: undefined });
      moveToNextStep();
    };

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <ScrollView style={styles.fw}>
          <FormTitle
            dark
            headline="What is your experience with real estate investment?"
          />
          <View style={styles.cardsWrapper}>
            {EXPERIENCES_AS_OPTIONS.map(({ title, value }) => (
              <Card
                selected={value === selectedExperience}
                key={value}
                id={title}
                title={title}
                value={value as Experience}
                onCardPress={setSelectedExperience}
              />
            ))}
          </View>
        </ScrollView>
        <View
          key={'buttons_section'}
          style={styles.buttonsSection}
        >
          <Button
            onPress={handleContinue}
            disabled={!selectedExperience}
          >
            Continue
          </Button>
          <Button
            variant="outlined"
            onPress={handleSkip}
          >
            Skip
          </Button>
        </View>
      </>
    );
  },
};
