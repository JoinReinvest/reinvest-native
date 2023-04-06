import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { STATES_AS_SELECT_OPTION } from 'reinvest-app-common/src/constants/states';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';

import { Button } from '../../../components/Button';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { ProgressBar } from '../../../components/ProgressBar';
import { Controller } from '../../../components/typography/Controller';
import { formValidationRules } from '../../../utils/formValidationRules';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

type Fields = Exclude<OnboardingFormFields['permanentAddress'], null>;

const schema = formValidationRules.address;

export const StepPermanentAddress: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.PERMANENT_ADDRESS,

  Component: ({ storeFields, moveToNextStep, updateStoreFields }: StepComponentProps<OnboardingFormFields>) => {
    const initialValues: Fields = { addressLine1: '', addressLine2: '', city: '', state: '', zip: '', country: 'USA' };
    const defaultValues: Fields = storeFields.permanentAddress || initialValues;

    const { progressPercentage } = useOnboardingFormFlow();
    const { handleSubmit, control, formState } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async permanentAddress => {
      const selectedStateCode = STATES_AS_SELECT_OPTION.find(({ label }) => label === permanentAddress.state)?.value;
      permanentAddress.state = selectedStateCode;
      await updateStoreFields({ permanentAddress });
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
            headline="What is your permanent address?"
            informationMessage="US Residents Only"
          />
          {/* TODO: Change to Search Input when implemented */}
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="addressLine1"
            inputProps={{ placeholder: 'Street Address or P.O. Box', dark: true }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="addressLine2"
            inputProps={{ placeholder: 'Apt, suite, unit, building, floor, etc', dark: true }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="city"
            inputProps={{ placeholder: 'City', dark: true }}
          />
          <Controller
            type="dropdown"
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="state"
            dropdownProps={{ placeholder: 'State', data: STATES_AS_SELECT_OPTION, dark: true }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="zip"
            inputProps={{ placeholder: 'Zip Code', dark: true, maxLength: 5, keyboardType: 'numeric' }}
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
