import React, { useState } from 'react';
import { FormTitle } from '@src/components/Forms/FormTitle';
import { styles } from './styles';
import { Card } from '@src/components/Card';
import { ScrollView, View } from 'react-native';
import { Button } from '@src/components/Button';
import { OnboardingFormFields } from '../types';
import { Identifiers } from '../identifiers';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useOnboardingFormFlow } from '.';
import { ProgressBar } from '@src/components/ProgressBar';
import { EmploymentStatusesValues, EMPLOYMENT_STATUSES } from '@src/constants/employment-status';

export const StepEmploymentStatus: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.EMPLOYMENT_STATUS,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const [selectedEmploymentStatus, setSelectedEmploymentStatus] = useState<EmploymentStatusesValues | undefined>(storeFields.employmentStatus);

    const handleContinue = async () => {
      await updateStoreFields({ employmentStatus: selectedEmploymentStatus });
    };

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
            {EMPLOYMENT_STATUSES.map(({ label, value }) => (
              <Card
                selected={value === selectedEmploymentStatus}
                key={value}
                id={value}
                title={label}
                onCardPress={setSelectedEmploymentStatus}
              />
            ))}
          </View>
        </ScrollView>
        <View
          key={'buttons_section'}
          style={styles.buttonsSection}
        >
          <Button
            disabled={!selectedEmploymentStatus}
            onPress={moveToNextStep}
          >
            Continue
          </Button>
          <Button
            variant="outlined"
            onPress={handleContinue}
          >
            Skip
          </Button>
        </View>
      </>
    );
  },
};
