import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import {
  CORPORATION_ANNUAL_REVENUE_AS_OPTIONS,
  CORPORATION_ANNUAL_REVENUES,
  CORPORATION_NUMBER_OF_EMPLOYEES,
  CORPORATION_NUMBER_OF_EMPLOYEES_AS_OPTIONS,
} from 'reinvest-app-common/src/constants/corporation';
import { INDUESTRIES_AS_OPTIONS } from 'reinvest-app-common/src/constants/industries';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { Button } from '../../../components/Button';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Controller } from '../../../components/typography/Controller';
import { INDUSTRIES_LABELS } from '../../../constants/industries';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { styles } from './styles';

type Fields = Pick<OnboardingFormFields, 'corporationAnnualRevenue' | 'corporationNumberOfEmployees' | 'corporationIndustry'>;

const schema = z.object({
  corporationAnnualRevenue: z.enum(CORPORATION_ANNUAL_REVENUES),
  corporationNumberOfEmployees: z.enum(CORPORATION_NUMBER_OF_EMPLOYEES),
  corporationIndustry: z.enum(INDUSTRIES_LABELS),
});

export const StepCorporationInformation: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATION_INFORMATION,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType !== DraftAccountType.Individual;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues: Fields = {
      corporationAnnualRevenue: storeFields.corporationAnnualRevenue,
      corporationNumberOfEmployees: storeFields.corporationNumberOfEmployees,
      corporationIndustry: storeFields.corporationIndustry,
    };
    const { formState, handleSubmit, control } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ corporationAnnualRevenue, corporationIndustry, corporationNumberOfEmployees }) => {
      const corporationIndustryValue = INDUESTRIES_AS_OPTIONS.find(industry => industry.label === corporationIndustry)?.value;

      await updateStoreFields({
        corporationAnnualRevenue,
        corporationNumberOfEmployees,
        corporationIndustry: corporationIndustryValue,
      });
      moveToNextStep();
    };

    return (
      <>
        <ScrollView style={[styles.fw]}>
          <FormTitle
            dark
            headline={`Please provide the following information regarding your ${
              storeFields.accountType === DraftAccountType.Corporate ? 'corporation' : 'trust'
            }.`}
          />
          <Controller
            type="dropdown"
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="corporationAnnualRevenue"
            dropdownProps={{
              dark: true,
              data: CORPORATION_ANNUAL_REVENUE_AS_OPTIONS,
              placeholder: 'Annual Revenue',
            }}
          />
          <Controller
            type="dropdown"
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="corporationNumberOfEmployees"
            dropdownProps={{
              dark: true,
              data: CORPORATION_NUMBER_OF_EMPLOYEES_AS_OPTIONS,
              placeholder: '# of Employees',
            }}
          />
          <Controller
            type="dropdown"
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="corporationIndustry"
            dropdownProps={{
              dark: true,
              data: INDUESTRIES_AS_OPTIONS,
              placeholder: 'Industry',
            }}
          />
        </ScrollView>
        <View
          key="buttons_section"
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
