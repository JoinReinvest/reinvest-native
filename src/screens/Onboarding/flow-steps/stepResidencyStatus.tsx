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
import {
  RESIDENCY_STATUS_AS_RADIO_GROUP_OPTIONS,
  RESIDENCY_STATUS_VALUES,
  ResidencyStatusValue,
} from '@constants/residenty-status';
import {RadioButtonGroup} from '@components/RadioButtonGroup';

type Fields = Pick<OnboardingFormFields, 'residency'>;

const schema = z.object({
  residency: z.enum(RESIDENCY_STATUS_VALUES),
});

export const StepResidencyStatus: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.RESIDENCY_STATUS,

  Component: ({
    storeFields,
    moveToNextStep,
    updateStoreFields,
  }: StepComponentProps<OnboardingFormFields>) => {
    console.log(storeFields.residency);
    const defaultValues: Fields = {residency: storeFields.residency};
    const {handleSubmit, setValue, watch} = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = watch('residency');

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      moveToNextStep();
    };

    const watchedResidency = watch('residency');

    return (
      <>
        <ScrollView style={[styles.fw]}>
          <FormTitle
            dark
            headline="Residency Status"
            description="Please select your US residency status."
            informationMessage="REINVEST does not accept non-US residents at this time."
          />
          <RadioButtonGroup
            selectedValue={watchedResidency}
            onSelect={val => setValue('residency', val as ResidencyStatusValue)}
            options={RESIDENCY_STATUS_AS_RADIO_GROUP_OPTIONS}
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
