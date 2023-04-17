import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { z } from 'zod';

import { Button } from '../../../components/Button';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Icon } from '../../../components/Icon';
import { ProgressBar } from '../../../components/ProgressBar';
import { Controller } from '../../../components/typography/Controller';
import { Identifiers } from '../identifiers';
import { CompanyTickerSymbol, OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

type Fields = Pick<OnboardingFormFields, 'companyTickerSymbols'>;

const DEFAULT_FIELDS = 3;
const MINIMUM_COMPANY_TICKER_SYMBOLS = 1;
const MAXIMUM_COMPANY_TICKER_SYMBOLS = 5;

const EMPTY_COMPANY_TICKER_SYMBOL: CompanyTickerSymbol = { symbol: '' };
const initialValues = new Array(DEFAULT_FIELDS).fill(undefined).map(() => EMPTY_COMPANY_TICKER_SYMBOL);

const schema = z
  .object({
    companyTickerSymbols: z
      .object({
        symbol: z.string(),
      })
      .array()
      .min(MINIMUM_COMPANY_TICKER_SYMBOLS)
      .max(MAXIMUM_COMPANY_TICKER_SYMBOLS),
  })
  .superRefine((fields, context) => {
    const countOfFilledFields = fields.companyTickerSymbols.filter(({ symbol }) => symbol !== '').length;
    const hasAtLeastThreeFilled = countOfFilledFields >= 1;

    if (!hasAtLeastThreeFilled) {
      return context.addIssue({
        code: 'custom',
        path: ['companyTickerSymbols'],
        message: `Must have at least ${MINIMUM_COMPANY_TICKER_SYMBOLS} ticker symbols.`,
      });
    }
  });

export const StepCompanyTickerSymbols: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.ACCOUNT_TYPE,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const hasStoredTickerSymbols = !!storeFields.companyTickerSymbols?.length;
    const defaultValues: Fields = { companyTickerSymbols: hasStoredTickerSymbols ? storeFields.companyTickerSymbols : initialValues };

    const [shouldAppendButtonBeDisabled, setShouldAppendButtonBeDisabled] = useState(true);

    const { formState, control, handleSubmit, watch } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const { fields, append } = useFieldArray({ control, name: 'companyTickerSymbols' });

    const onAdditionalCompanyClick = () => {
      append(EMPTY_COMPANY_TICKER_SYMBOL);
    };

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields({ companyTickerSymbols: fields.companyTickerSymbols });
      moveToNextStep();
    };

    const shouldSubmitButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    useEffect(() => {
      const { unsubscribe } = watch(({ companyTickerSymbols }) => {
        const hasFilledAllFields = !!companyTickerSymbols?.every(ticker => !!ticker?.symbol && ticker?.symbol !== '');
        const hasAtLeastAnElement = !!companyTickerSymbols?.length;

        setShouldAppendButtonBeDisabled((hasAtLeastAnElement && !hasFilledAllFields) || (companyTickerSymbols?.length ?? 0) >= MAXIMUM_COMPANY_TICKER_SYMBOLS);
      });

      return () => {
        unsubscribe();
      };
    }, [watch]);

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <ScrollView style={styles.fw}>
          <FormTitle
            dark
            headline="Please list ticker symbols of the publicly traded company(s) below."
          />
          {fields.map((field, index) => (
            <Controller
              key={field.id}
              onSubmit={handleSubmit(onSubmit)}
              fieldName={`companyTickerSymbols.${index}.symbol`}
              control={control}
              inputProps={{
                dark: true,
                placeholder: 'Ticker Symbol',
              }}
            />
          ))}
          <Button
            variant="primary"
            startIcon={<Icon icon="add" />}
            onPress={onAdditionalCompanyClick}
            disabled={shouldAppendButtonBeDisabled}
          >
            Add Additional Company
          </Button>
        </ScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={shouldSubmitButtonBeDisabled}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
