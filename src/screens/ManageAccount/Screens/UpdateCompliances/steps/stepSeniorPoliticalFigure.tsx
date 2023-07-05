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

type Fields = Pick<UpdateCompliancesFormFields, 'seniorPoliticalFigure'>;

const schema = z.object({
  seniorPoliticalFigure: formValidationRules.seniorPoliticalFigure,
});

export const StepSeniorPoliticalFigure: StepParams<UpdateCompliancesFormFields> = {
  identifier: Identifiers.SENIOR_POLITICAL_FIGURE,

  doesMeetConditionFields({ compliances }) {
    return !!compliances?.isSeniorPoliticalFigure;
  },

  Component: ({ storeFields: { seniorPoliticalFigure, compliances }, updateStoreFields, moveToNextStep }: StepComponentProps<UpdateCompliancesFormFields>) => {
    const {
      handleSubmit,
      control,
      formState: { isValid },
    } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: {
        seniorPoliticalFigure,
      },
    });
    const buttonLabel = Object.values(compliances).filter(statement => statement).length > 1 ? 'Continue' : 'Confirm';

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields({ seniorPoliticalFigure: fields.seniorPoliticalFigure });
      moveToNextStep();
    };

    return (
      <>
        <PaddedScrollView>
          <FormTitle headline="Please provide the name and position of this senior political figure." />
          <Controller
            type="textarea"
            control={control}
            fieldName="seniorPoliticalFigure"
            onSubmit={handleSubmit(onSubmit)}
            inputProps={{ placeholder: '220 characters', dark: false }}
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
