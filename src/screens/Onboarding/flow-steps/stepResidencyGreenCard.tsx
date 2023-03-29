import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { z } from 'zod';

import { Button } from '../../../components/Button';
import { Dropdown } from '../../../components/Dropdown';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { COUNTRIES_AS_OPTIONS, countriesMap } from '../../../constants/countries';
import { formValidationRules } from '../../../utils/formValidationRules';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { styles } from './styles';

type Fields = Pick<OnboardingFormFields, 'birthCountry' | 'citizenshipCountry'>;

const schema = z.object({
  birthCountry: formValidationRules.birthCountry,
  citizenshipCountry: formValidationRules.citizenshipCountry,
});

export const StepResidencyGreenCard: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.RESIDENCY_GREEN_CARD,
  doesMeetConditionFields: fields => fields.residency === 'green-card',

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { formState, handleSubmit, setValue, watch } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      moveToNextStep();
    };

    const birthCountry = watch('birthCountry');
    const citizenshipCountry = watch('citizenshipCountry');

    return (
      <>
        <ScrollView style={[styles.fw]}>
          <FormTitle
            dark
            headline="Please enter your US Green Card details."
            informationMessage="US Residents Only"
          />
          <Dropdown
            dark
            value={citizenshipCountry && countriesMap[citizenshipCountry as keyof typeof countriesMap]}
            placeholder={'Citizenship Country'}
            data={COUNTRIES_AS_OPTIONS}
            onSelect={value => setValue('citizenshipCountry', value.value.toString())}
          />
          <Dropdown
            value={birthCountry && countriesMap[birthCountry as keyof typeof countriesMap]}
            placeholder={'Birth Country'}
            dark
            data={COUNTRIES_AS_OPTIONS}
            onSelect={option => setValue('birthCountry', option.value.toString())}
          />
        </ScrollView>
        <View
          key={'buttons_section'}
          style={styles.buttonsSection}
        >
          <Button
            disabled={!shouldButtonBeDisabled}
            onPress={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
