import React from 'react';
import {
  StepComponentProps,
  StepParams,
} from 'reinvest-app-common/src/services/form-flow/interfaces';

import {ScrollView, View} from 'react-native';
import {styles} from './styles';
import {Button} from '@components/Button';
import {FormTitle} from '@components/Forms/FormTitle';
import {OnboardingFormFields} from '../types';
import {Identifiers} from '../identifiers';
import {z} from 'zod';
import {formValidationRules} from '@src/utils/formValidationRules';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller} from '@src/components/typography/Controller';

type Fields = Pick<
  OnboardingFormFields,
  'firstName' | 'middleName' | 'lastName'
>;

const schema = z.object({
  firstName: formValidationRules.firstName,
  middleName: formValidationRules.middleName,
  lastName: formValidationRules.lastName,
});

export const StepFullName: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.FULL_NAME,

  Component: ({
    storeFields,
    moveToNextStep,
    updateStoreFields,
  }: StepComponentProps<OnboardingFormFields>) => {
    const {handleSubmit, control, formState} = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: {
        firstName: '',
        middleName: '',
        lastName: '',
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
        <ScrollView style={[styles.fw]}>
          <FormTitle
            dark
            headline={'Enter your first and last name as it appears on your ID'}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName={'firstName'}
            inputProps={{placeholder: 'First Name', dark: true}}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName={'middleName'}
            inputProps={{placeholder: 'Middle Name (Optional)', dark: true}}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName={'lastName'}
            inputProps={{placeholder: 'Last Name', dark: true}}
          />
        </ScrollView>

        <View key={'buttons_section'} style={[styles.buttonsSection]}>
          <Button
            disabled={shouldButtonBeDisabled}
            isLoading={false}
            onPress={handleSubmit(onSubmit)}>
            Continue
          </Button>
        </View>
      </>
    );
  },
};
