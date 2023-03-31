import { Button } from '@components/Button';
import { Dropdown } from '@components/Dropdown';
import { FormTitle } from '@components/Forms/FormTitle';
import { zodResolver } from '@hookform/resolvers/zod';
import { formValidationRules } from '@utils/formValidationRules';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { COUNTRIES } from 'reinvest-app-common/src/constants/countries';
import { VISAS_AS_OPTIONS } from 'reinvest-app-common/src/constants/visas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { DomicileType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { VisaType } from '../../../types/visaType';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { styles } from './styles';

type Fields = Pick<OnboardingFormFields, 'birthCountry' | 'citizenshipCountry' | 'visaType'>;

const schema = z.object({
  birthCountry: formValidationRules.birthCountry,
  citizenshipCountry: formValidationRules.citizenshipCountry,
  visaType: formValidationRules.visaType,
});

export const StepResidencyVisa: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.RESIDENCY_VISA,
  doesMeetConditionFields: fields => fields.residency === DomicileType.Visa,
  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { formState, handleSubmit, watch, setValue } = useForm<Fields>({
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
    const visa = watch('visaType');

    return (
      <>
        <ScrollView style={[styles.fw]}>
          <FormTitle
            dark
            headline="Please enter your US Visa details."
            informationMessage="US Residents Only"
          />
          <Dropdown
            dark
            value={citizenshipCountry}
            placeholder="Citizenship Country"
            data={COUNTRIES}
            onSelect={option => setValue('citizenshipCountry', option.value.toString())}
          />
          <Dropdown
            value={birthCountry}
            placeholder="Birth Country"
            dark
            data={COUNTRIES}
            onSelect={option => setValue('birthCountry', option.value.toString())}
          />
          <Dropdown
            dark
            value={visa}
            placeholder="Visa Type"
            data={VISAS_AS_OPTIONS}
            onSelect={option => setValue('visaType', option.value as VisaType)}
          />
        </ScrollView>
        <View
          key="buttons_section"
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
