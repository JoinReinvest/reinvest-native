import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import z from 'zod';

import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { FormTitle } from '../../../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../../../components/PaddedScrollView';
import { Controller } from '../../../../../components/typography/Controller';
import { formValidationRules } from '../../../../../utils/formValidationRules';
import { UpdateCompliancesFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<UpdateCompliancesFormFields, 'finraInstitution'>;

const schema = z.object({
  finraInstitution: formValidationRules.finraInstitutionName,
});

export const StepFinra: StepParams<UpdateCompliancesFormFields> = {
  identifier: Identifiers.FINRA,

  doesMeetConditionFields({ compliances }) {
    return !!compliances?.isAssociatedWithFinra;
  },

  Component: ({ storeFields: { finraInstitution, compliances }, updateStoreFields, moveToNextStep }: StepComponentProps<UpdateCompliancesFormFields>) => {
    const {
      handleSubmit,
      control,
      formState: { isValid },
    } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: {
        finraInstitution,
      },
    });
    const buttonLabel = Object.values(compliances).filter(statement => statement).length > 1 ? 'Continue' : 'Confirm';

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields({ finraInstitution: fields.finraInstitution });
      moveToNextStep();
    };

    return (
      <>
        <PaddedScrollView>
          <FormTitle headline="Please provide name of the FINRA institution below." />
          <Controller
            control={control}
            fieldName="finraInstitution"
            onSubmit={handleSubmit(onSubmit)}
            inputProps={{ placeholder: 'FINRA Institute Name', dark: false }}
            trimmed
          />
        </PaddedScrollView>
        <Box
          fw
          px="default"
        >
          <Button
            disabled={!isValid}
            onPress={handleSubmit(onSubmit)}
          >
            {buttonLabel}
          </Button>
        </Box>
      </>
    );
  },
};
