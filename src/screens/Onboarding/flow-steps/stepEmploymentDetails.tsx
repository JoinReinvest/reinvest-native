import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { INDUESTRIES_AS_OPTIONS } from 'reinvest-app-common/src/constants/industries';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteIndividualDraftAccount } from 'reinvest-app-common/src/services/queries/completeIndividualDraftAccount';
import { DraftAccountType, EmploymentStatus } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { Controller } from '../../../components/typography/Controller';
import { INDUSTRIES_LABELS } from '../../../constants/industries';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

type Fields = Pick<OnboardingFormFields, 'employer'>;

const schema = z.object({
  employer: z.object({
    nameOfEmployer: formValidationRules.employerName,
    title: formValidationRules.occupation,
    industry: z.enum(INDUSTRIES_LABELS),
  }),
});

export const StepEmploymentDetails: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.EMPLOYMENT_DETAILS,

  willBePartOfTheFlow(fields) {
    const isAccountIndividual = fields.accountType === DraftAccountType.Individual;
    const isEmployed = fields.employmentStatus === EmploymentStatus.Employed;
    const meetsBaseRequirements = isAccountIndividual && isEmployed;

    return meetsBaseRequirements || meetsBaseRequirements;
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
      fields.employmentStatus,
    ];

    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const isAccountIndividual = fields.accountType === DraftAccountType.Individual;
    const isEmployed = fields.employmentStatus === EmploymentStatus.Employed;
    const meetsBaseRequirements = isAccountIndividual && isEmployed;

    return (meetsBaseRequirements && hasProfileFields) || meetsBaseRequirements;
  },
  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const { handleSubmit, control, formState } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const { isLoading, mutateAsync: completeIndividualDraftAccountMutate, isSuccess } = useCompleteIndividualDraftAccount(getApiClient);

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = async params => {
      const { employer } = params;

      if (!employer) {
        return;
      }

      await updateStoreFields({
        employer: { ...employer, industry: employer.industry },
      });

      if (storeFields.accountId && employer?.nameOfEmployer && employer?.title && employer?.industry) {
        await completeIndividualDraftAccountMutate({
          accountId: storeFields.accountId,
          input: { employer: { nameOfEmployer: employer.nameOfEmployer, title: employer.title, industry: employer.industry } },
        });
      }
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
        <PaddedScrollView dark>
          <FormTitle
            dark
            headline="Where are you employed?"
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="employer.nameOfEmployer"
            inputProps={{ placeholder: 'Name of Employer', dark: true }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="employer.title"
            inputProps={{ placeholder: 'Title', dark: true }}
          />
          <Controller
            type="dropdown"
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="employer.industry"
            dropdownProps={{
              dark: true,
              data: INDUESTRIES_AS_OPTIONS,
              placeholder: 'Industry',
            }}
          />
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            isLoading={isLoading}
            disabled={shouldButtonBeDisabled}
            onPress={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
