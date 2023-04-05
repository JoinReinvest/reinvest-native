import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { z } from 'zod';

import { Button } from '../../../components/Button';
import { FormTitle } from '../../../components/Forms/FormTitle';
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

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      moveToNextStep();
    };

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <ScrollView style={[styles.fw]}>
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
          />
        </ScrollView>
        <View
          key="buttons_section"
          style={[styles.buttonsSection]}
        >
          <Button
            disabled={shouldButtonBeDisabled}
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
