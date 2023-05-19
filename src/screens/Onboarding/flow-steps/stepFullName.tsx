import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { PrivacyPolicyStatement, StatementType, TermsAndConditionsStatement } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { Controller } from '../../../components/typography/Controller';
import { formValidationRules } from '../../../utils/formValidationRules';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

type Fields = Exclude<OnboardingFormFields['name'], undefined>;

const schema = z.object({
  firstName: formValidationRules.firstName,
  middleName: formValidationRules.middleName,
  lastName: formValidationRules.lastName,
});

export const StepFullName: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.FULL_NAME,

  willBePartOfTheFlow(fields) {
    return !fields.accountType && !fields.isCompletedProfile;
  },

  doesMeetConditionFields(fields) {
    const requiredFields = [fields.accountType];

    return allRequiredFieldsExists(requiredFields) && !fields.isCompletedProfile;
  },

  Component: ({ storeFields, moveToNextStep, updateStoreFields }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();

    const { handleSubmit, control, formState } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: {
        ...storeFields.name,
      },
    });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const { isLoading, mutateAsync: completeProfileMutate, isSuccess } = useCompleteProfileDetails(getApiClient);
    const onSubmit: SubmitHandler<Fields> = async fields => {
      await completeProfileMutate({
        input: {
          name: fields,
          statements: [
            { type: StatementType.PrivacyPolicy, forPrivacyPolicy: { statement: PrivacyPolicyStatement.IHaveReadAndAgreeToTheReinvestPrivacyPolicy } },
            {
              type: StatementType.TermsAndConditions,
              forTermsAndConditions: { statement: TermsAndConditionsStatement.IHaveReadAndAgreeToTheReinvestTermsAndConditions },
            },
          ],
        },
      });
      await updateStoreFields({ name: fields });
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
            headline="Enter your first and last name as it appears on your ID"
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="firstName"
            inputProps={{ placeholder: 'First Name', dark: true }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="middleName"
            inputProps={{ placeholder: 'Middle Name (Optional)', dark: true }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="lastName"
            inputProps={{ placeholder: 'Last Name', dark: true }}
          />
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={[styles.buttonsSection]}
        >
          <Button
            disabled={shouldButtonBeDisabled}
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
