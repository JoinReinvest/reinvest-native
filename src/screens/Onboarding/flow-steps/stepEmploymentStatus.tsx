import { Button } from '@src/components/Button';
import { Card } from '@src/components/Card';
import { FormTitle } from '@src/components/Forms/FormTitle';
import { ProgressBar } from '@src/components/ProgressBar';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { EMPLOYMENT_STATUSES } from 'reinvest-app-common/src/constants/employment_statuses';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { AccountType, EmploymentStatus } from 'reinvest-app-common/src/types/graphql';

import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

export const StepEmploymentStatus: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.EMPLOYMENT_STATUS,

  doesMeetConditionFields(fields) {
    const { accountType } = fields;

    return accountType === AccountType.Individual;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const [selectedEmploymentStatus, setSelectedEmploymentStatus] = useState<EmploymentStatus | undefined>(storeFields.employmentStatus);

    const handleContinue = async () => {
      await updateStoreFields({ employmentStatus: selectedEmploymentStatus });
      moveToNextStep();
    };

    const handleSkip = async () => {
      await updateStoreFields({ employmentStatus: undefined });
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
            headline="Where are you employed?"
          />
          <View style={styles.cardsWrapper}>
            {EMPLOYMENT_STATUSES.map(({ title, value }) => (
              <Card
                selected={value === selectedEmploymentStatus}
                key={value}
                id={value}
                value={value as EmploymentStatus}
                title={title}
                onCardPress={setSelectedEmploymentStatus}
              />
            ))}
          </View>
        </ScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            disabled={!selectedEmploymentStatus}
            onPress={handleContinue}
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
