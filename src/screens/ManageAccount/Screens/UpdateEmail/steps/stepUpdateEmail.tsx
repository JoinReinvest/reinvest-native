import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import z from 'zod';

import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Controller } from '../../../../../components/typography/Controller';
import { StyledText } from '../../../../../components/typography/StyledText';
import { useAuth } from '../../../../../providers/AuthProvider';
import { UpdateEmailFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

interface Fields {
  email: string;
}

const schema = z.object({
  email: formValidationRules.email,
});

export const StepUpdateEmail: StepParams<UpdateEmailFormFields> = {
  identifier: Identifiers.UPDATE_EMAIL,

  Component: ({ moveToNextStep, updateStoreFields }: StepComponentProps<UpdateEmailFormFields>) => {
    const { user } = useAuth();
    const { formState, handleSubmit, control } = useForm<Fields>({
      mode: 'onBlur',
      resolver: zodResolver(schema),
      defaultValues: { email: '' },
    });

    const shouldButtonBeDisabled = !formState.isValid;

    const onSubmit = async ({ email }: Fields) => {
      user?.updateAttributes([{ Name: 'email', Value: email }], err => {
        if (err instanceof Error) {
          throw err;
        }
      });

      await updateStoreFields({ email });
      moveToNextStep();
    };

    return (
      <Box
        fw
        flex={1}
      >
        <Box
          fw
          flex={1}
        >
          <Box mb="16">
            <StyledText>Add Email Address</StyledText>
          </Box>
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="email"
            inputProps={{ placeholder: 'Email Address' }}
          />
        </Box>
        <Box>
          <Button
            disabled={shouldButtonBeDisabled}
            onPress={handleSubmit(onSubmit)}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    );
  },
};
