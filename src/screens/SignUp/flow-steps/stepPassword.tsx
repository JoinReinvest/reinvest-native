import { Auth } from '@aws-amplify/auth';
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
import { styles } from '../flow-steps/styles';
import { Identifiers } from '../identifiers';
import { RegisterFormFields } from '../types';

interface Fields extends Pick<RegisterFormFields, 'password'> {
  passwordConfirmation: string;
}

export const StepPassword: StepParams<RegisterFormFields> = {
  identifier: Identifiers.PASSWORD,

  doesMeetConditionFields: fields => !!fields.email,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<RegisterFormFields>) => {
    const { loading, actions } = useAuth();

    const [error, setError] = useState<string | undefined>(undefined);

    useKeyboardAware(false);
    const { isSoftInputShown } = useSoftInputState();

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
        await actions.signUp({
          username: storeFields.email,
          password: values.password,
          attributes: {
            'custom:incentive_token': storeFields.referralCode || '',
          },
          autoSignIn: {
            enabled: false,
          },
        });

        return moveToNextStep();
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name === 'UsernameExistsException') {
            await Auth.resendSignUp(storeFields.email);

            return moveToNextStep();
          }

          if (err.message.includes('WRONG_REFERRAL_CODE')) {
            err.message = 'Invalid referral code';
          }

          setError(err.message);
        }
      }
    };

    return (
      <>
        <PaddedScrollView>
          <FormTitle
            dark
            headline="Sign Up to REINVEST"
            description="Create a unique password for your account to continue."
            compact={isSoftInputShown}
          />
          {error && (
            <FormMessage
              message={error}
              variant="error"
            />
          )}
          <Controller
            inputProps={{
              dark: true,
              placeholder: 'Password',
              returnKeyType: 'next',
            }}
            fieldName="password"
            control={control}
            onSubmit={() => setFocus('passwordConfirmation')}
          />
          <Controller
            inputProps={{
              dark: true,
              placeholder: 'Repeat Password',
              returnKeyType: 'done',
            }}
            fieldName="passwordConfirmation"
            control={control}
            onSubmit={handleSubmit(onSubmit)}
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
            Sign Up
          </Button>
        </View>
      </>
    );
  },
};
