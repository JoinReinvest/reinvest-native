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
import { StyledText } from '../../../components/typography/StyledText';
import { useAuth } from '../../../providers/AuthProvider';
import { styles } from '../../../screens/SignIn/flow-steps/styles';
import { formValidationRules } from '../../../utils/formValidationRules';
import { LoginFormFields } from '../../SignIn/types';
import { Identifiers } from '../identifiers';

export type Fields = Pick<LoginFormFields, 'authenticationCode'>;

export const StepCheckYourPhone: StepParams<LoginFormFields> = {
  identifier: Identifiers.PHONE_AUTHENTICATION,

  Component: ({ storeFields }: StepComponentProps<LoginFormFields>) => {
    const { actions, loading } = useAuth();
    const schema: Schema<Fields> = zod.object({
      authenticationCode: formValidationRules.authenticationCode,
    });
    const [error, setError] = useState('');

    const { formState, handleSubmit, control } = useForm<LoginFormFields>({
      defaultValues: storeFields,
      resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<Fields> = async fields => {
      try {
        await actions.confirmSignIn(fields.authenticationCode);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    const shouldButtonBeDisabled = !formState.isValid || loading;

    return (
      <>
        <PaddedScrollView style={{ width: '100%' }}>
          <FormTitle
            dark
            headline="Check Your Phone"
            description="Enter the SMS authentication code sent to your phone (xxx) xxxx-xx84."
          />
          {error && (
            <FormMessage
              message={error}
              variant="error"
            />
          )}
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="authenticationCode"
            inputProps={{
              placeholder: 'Authentication Code',
              dark: true,
              keyboardType: 'numeric',
              maxLength: 6,
            }}
          />
        </PaddedScrollView>
        <View style={styles.row}>
          <StyledText
            variant="link"
            color="frostGreen"
          >
            Resend Code
          </StyledText>
          <StyledText
            variant="link"
            color="frostGreen"
          >
            Get Help
          </StyledText>
        </View>
        <Button
          disabled={shouldButtonBeDisabled}
          onPress={handleSubmit(onSubmit)}
        >
          Continue
        </Button>
      </>
    );
  },
};
