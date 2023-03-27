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
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {formValidationRules} from '@utils/formValidationRules';
import {Dropdown} from '@components/Dropdown';
import {COUNTRIES_AS_OPTIONS, countriesMap} from '@constants/countries';

type Fields = Pick<OnboardingFormFields, 'birthCountry' | 'citizenshipCountry'>;

const schema = z.object({
  birthCountry: formValidationRules.birthCountry,
  citizenshipCountry: formValidationRules.citizenshipCountry,
});

export const StepResidencyGreenCard: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.RESIDENCY_GREEN_CARD,
  doesMeetConditionFields: fields => fields.residency === 'green-card',

  Component: ({
    storeFields,
    updateStoreFields,
    moveToNextStep,
  }: StepComponentProps<OnboardingFormFields>) => {
    const {formState, handleSubmit, setValue, watch} = useForm<Fields>({
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
            value={
              citizenshipCountry &&
              countriesMap[citizenshipCountry as keyof typeof countriesMap]
            }
            placeholder={'Citizenship Country'}
            data={COUNTRIES_AS_OPTIONS}
            onSelect={value =>
              setValue('citizenshipCountry', value.value.toString())
            }
          />
          <Dropdown
            value={
              birthCountry &&
              countriesMap[birthCountry as keyof typeof countriesMap]
            }
            placeholder={'Birth Country'}
            dark
            data={COUNTRIES_AS_OPTIONS}
            onSelect={option =>
              setValue('birthCountry', option.value.toString())
            }
          />
        </ScrollView>
        <View key={'buttons_section'} style={styles.buttonsSection}>
          <Button
            disabled={!shouldButtonBeDisabled}
            onPress={handleSubmit(onSubmit)}>
            Continue
          </Button>
        </View>
      </>
    );
  },
};
