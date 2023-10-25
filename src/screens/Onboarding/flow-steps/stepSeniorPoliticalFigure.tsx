import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { StatementType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { Controller } from '../../../components/typography/Controller';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

type Fields = Pick<OnboardingFormFields, 'seniorPoliticalFigure'>;

const schema = z.object({
  seniorPoliticalFigure: z.string().min(1).max(220),
});

export const StepSeniorPoliticalFigure: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.SENIOR_POLITICAL_FIGURE,

  willBePartOfTheFlow: ({ statementTypes, isCompletedProfile }) => {
    return !!statementTypes?.includes(StatementType.Politician) && !isCompletedProfile;
  },

  doesMeetConditionFields(fields) {
    const requiredFields = [fields.accountType, fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency];

    return allRequiredFieldsExists(requiredFields) && !!fields.compliances?.isSeniorPoliticalFigure && !fields.isCompletedProfile;
  },

  Component: ({ storeFields, moveToNextStep, updateStoreFields }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const { handleSubmit, control, formState } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: {
        seniorPoliticalFigure: '',
        ...storeFields,
      },
    });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const { isLoading, mutateAsync: completeProfileMutate, isSuccess } = useCompleteProfileDetails(getApiClient);

    const onSubmit: SubmitHandler<Fields> = async ({ seniorPoliticalFigure }) => {
      await updateStoreFields({ seniorPoliticalFigure });

      if (seniorPoliticalFigure) {
        await completeProfileMutate({ input: { statements: [{ type: StatementType.Politician, forPolitician: { description: seniorPoliticalFigure } }] } });
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
            headline="Please provide the name and position of this senior political figure."
          />
          <Controller
            type="textarea"
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="seniorPoliticalFigure"
            inputProps={{ placeholder: '220 characters', dark: true }}
            trimmed
          />
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={[styles.buttonsSection]}
        >
          <Button
            disabled={shouldButtonBeDisabled || isLoading}
            isLoading={false}
            onPress={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
