import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@src/components/Button';
import { FormTitle } from '@src/components/Forms/FormTitle';
import { ProgressBar } from '@src/components/ProgressBar';
import { Controller } from '@src/components/typography/Controller';
import { INDUSTRIES_LABELS } from '@src/constants/industries';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { INDUESTRIES_AS_OPTIONS } from 'reinvest-app-common/src/constants/industries';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { AccountType, EmploymentStatus } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

type Fields = Pick<OnboardingFormFields, 'employmentDetails'>;

const schema = z.object({
  employmentDetails: z.object({
    employerName: formValidationRules.employerName,
    occupation: formValidationRules.occupation,
    industry: z.enum(INDUSTRIES_LABELS),
  }),
});

export const StepEmploymentDetails: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.EMPLOYMENT_DETAILS,

  doesMeetConditionFields(fields) {
    const { accountType, employmentStatus } = fields;

    return accountType === AccountType.Individual && employmentStatus === EmploymentStatus.Employed;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const { handleSubmit, control, formState } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ employmentDetails }) => {
      if (!employmentDetails) {
        return;
      }

      const industryValue = INDUESTRIES_AS_OPTIONS.find(industry => industry.label === employmentDetails.industry)?.value ?? '';

      await updateStoreFields({
        employmentDetails: { ...employmentDetails, industry: industryValue },
      });
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
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName={'employmentDetails.employerName'}
            inputProps={{ placeholder: 'Name of Employer', dark: true }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName={'employmentDetails.occupation'}
            inputProps={{ placeholder: 'Title', dark: true }}
          />
          <Controller
            select
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName={'employmentDetails.industry'}
            dropdownProps={{
              dark: true,
              data: INDUESTRIES_AS_OPTIONS,
              placeholder: 'Industry',
            }}
          />
        </ScrollView>
        <View
          key={'buttons_section'}
          style={styles.buttonsSection}
        >
          <Button
            disabled={shouldButtonBeDisabled}
            onPress={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
          <Button
            variant="outlined"
            onPress={moveToNextStep}
          >
            Skip
          </Button>
        </View>
      </>
    );
  },
};
