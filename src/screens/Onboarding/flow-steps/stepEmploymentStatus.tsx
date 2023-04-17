import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { EMPLOYMENT_STATUSES } from 'reinvest-app-common/src/constants/employment_statuses';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteIndividualDraftAccount } from 'reinvest-app-common/src/services/queries/completeIndividualDraftAccount';
import { DraftAccountType, EmploymentStatus } from 'reinvest-app-common/src/types/graphql';

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

export const StepEmploymentStatus: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.EMPLOYMENT_STATUS,

  willBePartOfTheFlow(fields) {
    return fields.accountType === DraftAccountType.Individual;
  },

  doesMeetConditionFields(fields) {
    const profileFields = [
      fields.name?.firstName,
      fields.name?.lastName,
      fields.dateOfBirth,
      fields.residency,
      fields.ssn,
      fields.address,
      fields.isAccreditedInvestor,
      fields.experience,
    ];

    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const isAccountIndividual = fields.accountType === DraftAccountType.Individual;

    return (isAccountIndividual && hasProfileFields) || isAccountIndividual;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();

    const [selectedEmploymentStatus, setSelectedEmploymentStatus] = useState<EmploymentStatus | undefined>(storeFields?.employmentStatus);

    const { isLoading, mutateAsync: completeIndividualDraftAccountMutate, isSuccess } = useCompleteIndividualDraftAccount(getApiClient);

    const handleContinue = async () => {
      await updateStoreFields({ employmentStatus: selectedEmploymentStatus });

      if (selectedEmploymentStatus) {
        await completeIndividualDraftAccountMutate({
          accountId: storeFields.accountId || '',
          input: { employmentStatus: { status: selectedEmploymentStatus } },
        });
      }
    };

    const handleSkip = async () => {
      await updateStoreFields({ employmentStatus: undefined });
      moveToNextStep();
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
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            disabled={!selectedEmploymentStatus || isLoading}
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
