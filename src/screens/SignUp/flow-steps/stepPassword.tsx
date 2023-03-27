import { Auth } from '@aws-amplify/auth';
import { Button } from '@components/Button';
import { PasswordChecklist } from '@components/CheckList/PasswordCheckList';
import { FormMessage } from '@components/Forms/FormMessage';
import { FormTitle } from '@components/Forms/FormTitle';
import { KeyboardAwareWrapper } from '@components/KeyboardAvareWrapper';
import { Controller } from '@components/typography/Controller';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@providers/AuthProvider';
import { styles } from '@screens/SignUp/flow-steps/styles';
import { RegisterFormFields } from '@screens/SignUp/SignUp.types';
import { formValidationRules } from '@utils/formValidationRules';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/form-flow/interfaces';
import zod, { Schema } from 'zod';

import { Identifiers } from '../identifiers';

interface Fields extends Pick<RegisterFormFields, 'password'> {
  passwordConfirmation: string;
}

export const StepPassword: StepParams<RegisterFormFields> = {
  identifier: Identifiers.PASSWORD,

  doesMeetConditionFields: fields => !!fields.email,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<RegisterFormFields>) => {
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
      } catch (err: any) {
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
      <KeyboardAwareWrapper style={styles.wrapper}>
        <ScrollView>
          <FormTitle
            dark
            headline={'Sign up to REINVEST'}
            description={'Create a unique password for your account to continue.'}
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
            Sign up
          </Button>
        </View>
      </KeyboardAwareWrapper>
    );
  },
};
