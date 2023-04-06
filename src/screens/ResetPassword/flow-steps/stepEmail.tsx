import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import zod, { Schema } from 'zod';

import { Button } from '../../../components/Button';
import { FormMessage } from '../../../components/Forms/FormMessage';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { Controller } from '../../../components/typography/Controller';
import { useAuth } from '../../../providers/AuthProvider';
import { formValidationRules } from '../../../utils/formValidationRules';
import { Identifiers } from '../identifires';
import { ResetPasswordFormFields } from '../types';
import { styles } from './styles';

type Fields = Pick<ResetPasswordFormFields, 'email'>;

export const StepEmail: StepParams<ResetPasswordFormFields> = {
  identifier: Identifiers.EMAIL,
  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<ResetPasswordFormFields>) => {
    const schema: Schema<Fields> = zod.object({
      email: formValidationRules.email,
    });
    const { loading, actions } = useAuth();
    const [error, setError] = useState<string | undefined>();

    const { handleSubmit, control, formState } = useForm<Fields>({
      defaultValues: storeFields,
      mode: 'onSubmit',
      resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<Fields> = async fields => {
      updateStoreFields(fields);

      try {
        await actions.forgotPassword(fields.email);
        moveToNextStep();
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    };

    return (
      <>
        {error && (
          <FormMessage
            message={error}
            variant="error"
          />
        )}
        <PaddedScrollView>
          <FormTitle
            dark
            headline="Reset Password"
            description="Enter the email associated with your account and we’ll send an email with instructions to reset your password."
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="email"
            inputProps={{
              placeholder: 'Email Address',
              dark: true,
            }}
          />
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            disabled={!formState.dirtyFields || loading}
            isLoading={loading}
            onPress={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};
StepEmail.Component.displayName = 'StepEmail';
