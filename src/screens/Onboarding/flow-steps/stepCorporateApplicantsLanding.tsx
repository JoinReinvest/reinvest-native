import React from 'react';
import { ScrollView, View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { Button } from '../../../components/Button';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { styles } from './styles';

export const StepCorporateApplicantsLanding: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATE_APPLICANTS_LANDING,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate;
  },

  Component: ({ updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const onAddNewApplicant = () => {
      updateStoreFields({ _willHaveMajorStakeholderApplicants: true });
      moveToNextStep();
    };

    const onSkip = () => {
      updateStoreFields({ _willHaveMajorStakeholderApplicants: false });
      moveToNextStep();
    };

    return (
      <>
        <ScrollView style={[styles.fw]}>
          <FormTitle
            dark
            headline="Major Stakeholder Applicants"
            description="For each major stakeholder with a 20% or greater equity stake, we require their information."
          />
        </ScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            variant="outlined"
            onPress={onAddNewApplicant}
          >
            Add Applicant
          </Button>
          <Button onPress={onSkip}>Skip</Button>
        </View>
      </>
    );
  },
};
