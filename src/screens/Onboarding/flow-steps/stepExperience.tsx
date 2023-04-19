import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { EXPERIENCES_AS_OPTIONS } from 'reinvest-app-common/src/constants/experiences';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { DraftAccountType, Experience } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

export const StepExperience: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.EXPERIENCE,

  willBePartOfTheFlow(fields) {
    return fields.accountType === DraftAccountType.Individual && !fields.isCompletedProfile;
  },
  doesMeetConditionFields(fields) {
    const requiredFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency, fields.ssn];

    return fields.accountType === DraftAccountType.Individual && !fields.isCompletedProfile && allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const [selectedExperience, setSelectedExperience] = useState<Experience | null | undefined>(storeFields.experience);

    const { isLoading, mutateAsync: completeProfileMutate, isSuccess } = useCompleteProfileDetails(getApiClient);

    const handleContinue = async () => {
      await updateStoreFields({ experience: selectedExperience });
      await completeProfileMutate({ input: { investingExperience: { experience: selectedExperience } } });
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView>
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
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            onPress={handleContinue}
            disabled={!selectedExperience || isLoading}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
