import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { z } from 'zod';

import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { FormTitle } from '../../../../../components/Forms/FormTitle';
import { Icon } from '../../../../../components/Icon';
import { PaddedScrollView } from '../../../../../components/PaddedScrollView';
import { Controller } from '../../../../../components/typography/Controller';
import { CompanyTickerSymbol } from '../../../../Onboarding/types';
import { UpdateCompliancesFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<UpdateCompliancesFormFields, 'companyTickerSymbols'>;

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

export const StepCompanyTickerSymbols: StepParams<UpdateCompliancesFormFields> = {
  identifier: Identifiers.COMPANY_TICK_SYMBOLS,

  doesMeetConditionFields({ compliances }) {
    return !!compliances.isAssociatedWithPubliclyTradedCompany;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<UpdateCompliancesFormFields>) => {
    const hasStoredTickerSymbols = !!storeFields.companyTickerSymbols?.length;
    const defaultValues: Fields = { companyTickerSymbols: hasStoredTickerSymbols ? storeFields.companyTickerSymbols : initialValues };

    const [shouldAppendButtonBeDisabled, setShouldAppendButtonBeDisabled] = useState(
      !((storeFields.companyTickerSymbols?.length || 0) >= MINIMUM_COMPANY_TICKER_SYMBOLS),
    );

    const { formState, control, handleSubmit, watch } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const { fields, append } = useFieldArray({ control, name: 'companyTickerSymbols' });

    const onAdditionalCompanyClick = () => {
      append(EMPTY_COMPANY_TICKER_SYMBOL);
    };

    const onSubmit: SubmitHandler<Fields> = async ({ companyTickerSymbols }) => {
      await updateStoreFields({ companyTickerSymbols });
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
        <PaddedScrollView>
          <FormTitle headline="Please list ticker symbols of the publicly traded company(s) below." />
          {fields.map((field, index) => (
            <Controller
              key={field.id}
              onSubmit={handleSubmit(onSubmit)}
              fieldName={`companyTickerSymbols.${index}.symbol`}
              control={control}
              inputProps={{
                placeholder: 'Ticker Symbol',
              }}
              trimmed
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
        </PaddedScrollView>
        <Box
          fw
          px="default"
        >
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={shouldSubmitButtonBeDisabled}
          >
            Confirm
          </Button>
        </Box>
      </>
    );
  },
};
