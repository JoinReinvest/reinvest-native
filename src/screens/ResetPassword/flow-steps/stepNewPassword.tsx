import { Button } from '@components/Button';
import { PasswordChecklist } from '@components/CheckList/PasswordCheckList';
import { FormMessage } from '@components/Forms/FormMessage';
import { FormTitle } from '@components/Forms/FormTitle';
import { KeyboardAwareWrapper } from '@components/KeyboardAvareWrapper';
import { Controller } from '@components/typography/Controller';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@providers/AuthProvider';
import { formValidationRules } from '@utils/formValidationRules';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/form-flow/interfaces';
import zod, { Schema } from 'zod';

import { Identifiers } from '../identifires';
import { ResetPasswordFormFields } from '../types';
import { styles } from './styles';

interface Fields extends Pick<ResetPasswordFormFields, 'password'> {
  passwordConfirmation: string;
}

export const StepNewPassword: StepParams<ResetPasswordFormFields> = {
  identifier: Identifiers.PASSWORD,

  doesMeetConditionFields: fields => !!fields.email,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<ResetPasswordFormFields>) => {
    const { loading, actions } = useAuth();
    const [error, setError] = useState<string | undefined>(undefined);
    const schema: Schema<Fields> = zod
      .object({
        password: formValidationRules.password,
        passwordConfirmation: formValidationRules.confirm_password,
      })
      .refine(data => data.password === data.passwordConfirmation, {
        message: 'Passwords must match',
        path: ['passwordConfirmation'],
      });

    const { handleSubmit, control, watch } = useForm<Fields>({
      defaultValues: storeFields,
      resolver: zodResolver(schema),
    });

    const fields = {
      password: watch('password'),
      passwordConfirmation: watch('passwordConfirmation'),
    };

    const onSubmit: SubmitHandler<Fields> = async values => {
      setError(undefined);
      updateStoreFields(values);
      try {
        await actions.forgotPasswordSubmit(storeFields.email, storeFields.authenticationCode, values.password);

        moveToNextStep();
      } catch (err: any) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    };

    return (
      <KeyboardAwareWrapper style={styles.wrapper}>
        <ScrollView>
          <FormTitle
            dark
            headline={'Reset Password'}
            description={'Your new password must be different from previous used passwords.'}
          />
          {error && (
            <FormMessage
              message={error}
              variant={'error'}
            />
          )}
          <Controller
            inputProps={{ dark: true, placeholder: 'Password ' }}
            fieldName="password"
            control={control}
            onSubmit={handleSubmit(onSubmit)}
          />
          <Controller
            inputProps={{ dark: true, placeholder: 'Confirm Password' }}
            fieldName="passwordConfirmation"
            control={control}
            onSubmit={handleSubmit(onSubmit)}
          />
          <PasswordChecklist
            password={fields.password}
            passwordConfirmation={fields.passwordConfirmation}
          />
        </ScrollView>
        <View
          key={'buttons_section'}
          style={styles.buttonsSection}
        >
          <Button
            disabled={loading}
            isLoading={loading}
            onPress={handleSubmit(onSubmit)}
          >
            Change Password
          </Button>
        </View>
      </KeyboardAwareWrapper>
    );
  },
};
