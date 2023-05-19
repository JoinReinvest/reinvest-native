import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useSoftInputState } from 'react-native-avoid-softinput';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import zod, { Schema } from 'zod';

import { Button } from '../../../components/Button';
import { PasswordChecklist } from '../../../components/CheckList/PasswordCheckList';
import { FormMessage } from '../../../components/Forms/FormMessage';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { Controller } from '../../../components/typography/Controller';
import { useKeyboardAware } from '../../../hooks/useKeyboardAware';
import { useAuth } from '../../../providers/AuthProvider';
import { formValidationRules } from '../../../utils/formValidationRules';
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

    const { isSoftInputShown } = useSoftInputState();
    useKeyboardAware(false);

    const schema: Schema<Fields> = zod
      .object({
        password: formValidationRules.password,
        passwordConfirmation: formValidationRules.confirm_password,
      })
      .refine(data => data.password === data.passwordConfirmation, {
        message: 'Passwords must match',
        path: ['passwordConfirmation'],
      });

    const { formState, handleSubmit, control, watch, setFocus } = useForm<Fields>({
      defaultValues: storeFields,
      resolver: zodResolver(schema),
    });

    const fields = {
      password: watch('password'),
      passwordConfirmation: watch('passwordConfirmation'),
    };

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || loading;

    const onSubmit: SubmitHandler<Fields> = async values => {
      setError(undefined);
      await updateStoreFields(values);
      try {
        await actions.forgotPasswordSubmit(storeFields.email, storeFields.authenticationCode, values.password);

        moveToNextStep();
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    };

    const handleSubmitFromKeyboard = (field: keyof Fields) => {
      fields[field] ? handleSubmit(onSubmit)() : setFocus(field);
    };

    return (
      <>
        <PaddedScrollView dark>
          <FormTitle
            dark
            headline="Reset Password"
            description="Your new password must be different from previous used passwords."
            compact={isSoftInputShown}
          />
          {error && (
            <FormMessage
              message={error}
              variant="error"
            />
          )}
          <Controller
            inputProps={{ dark: true, placeholder: 'Password ' }}
            fieldName="password"
            control={control}
            onSubmit={() => handleSubmitFromKeyboard('passwordConfirmation')}
          />
          <Controller
            inputProps={{ dark: true, placeholder: 'Confirm Password' }}
            fieldName="passwordConfirmation"
            control={control}
            onSubmit={() => handleSubmitFromKeyboard('password')}
          />
          <PasswordChecklist
            password={fields.password}
            passwordConfirmation={fields.passwordConfirmation}
          />
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            disabled={shouldButtonBeDisabled}
            isLoading={loading}
            onPress={handleSubmit(onSubmit)}
          >
            Change Password
          </Button>
        </View>
      </>
    );
  },
};
