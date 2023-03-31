import { Button } from '@components/Button';
import { FormTitle } from '@components/Forms/FormTitle';
import { Controller } from '@components/typography/Controller';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { z } from 'zod';

import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { styles } from './styles';

type Fields = Pick<OnboardingFormFields, 'finraInstitution'>;

const schema = z.object({
  finraInstitution: z.string().min(1),
});

export const StepFinraInstitution: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.FINRA_INSTITUTION,

  willBePartOfTheFlow: ({ compliances }) => {
    return !!compliances?.isAssociatedWithFinra;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { control, formState, handleSubmit, watch } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const watchedFinra = watch('finraInstitution');

    const shouldButtonBeDisabled = !watchedFinra || !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      moveToNextStep();
    };

    return (
      <>
        <ScrollView style={[styles.fw]}>
          <FormTitle
            dark
            headline="Please provide name of the FINRA institution below."
          />
          <Controller
            control={control}
            fieldName="finraInstitution"
            onSubmit={handleSubmit(onSubmit)}
            inputProps={{ placeholder: 'FINRA Institute Name', dark: true }}
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
        </View>
      </>
    );
  },
};
