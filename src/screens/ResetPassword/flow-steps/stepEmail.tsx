import {zodResolver} from '@hookform/resolvers/zod';

import {formValidationRules} from '@utils/formValidationRules';

import React, {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {
  StepComponentProps,
  StepParams,
} from 'reinvest-app-common/src/services/form-flow/interfaces';
import zod, {Schema} from 'zod';

import {styles} from './styles';
import {Controller} from '@components/typography/Controller';
import {FormTitle} from '@components/Forms/FormTitle';
import {Button} from '@components/Button';
import {ResetPasswordFormFields} from '../types';
import {useAuth} from '@src/providers/AuthProvider';
import {FormMessage} from '@src/components/Forms/FormMessage';
import {Identifiers} from '../identifires';
import {ScrollView, View} from 'react-native';

type Fields = Pick<ResetPasswordFormFields, 'email'>;

export const StepEmail: StepParams<ResetPasswordFormFields> = {
  identifier: Identifiers.EMAIL,
  Component: ({
    storeFields,
    updateStoreFields,
    moveToNextStep,
  }: StepComponentProps<ResetPasswordFormFields>) => {
    const schema: Schema<Fields> = zod.object({
      email: formValidationRules.email,
    });
    const {loading, actions} = useAuth();
    const [error, setError] = useState<string | undefined>();

    const {handleSubmit, control, formState} = useForm<Fields>({
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
        {error && <FormMessage message={error} variant={'error'} />}
        <ScrollView style={styles.fw}>
          <FormTitle
            dark
            headline="Reset Password"
            description="Enter the email associated with your account and we’ll send an email with instructions to reset your password."
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName={'email'}
            inputProps={{
              placeholder: 'Email Address',
              dark: true,
            }}
          />
        </ScrollView>
        <View key={'buttons_section'} style={styles.buttonsSection}>
          <Button
            disabled={!formState.dirtyFields || loading}
            isLoading={loading}
            onPress={handleSubmit(onSubmit)}>
            Continue
          </Button>
        </View>
      </>
    );
  },
};
StepEmail.Component.displayName = 'StepEmail';
