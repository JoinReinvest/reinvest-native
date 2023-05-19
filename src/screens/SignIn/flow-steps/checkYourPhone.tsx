import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import zod, { Schema } from 'zod';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FormMessage } from '../../../components/Forms/FormMessage';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { Controller } from '../../../components/typography/Controller';
import { StyledText } from '../../../components/typography/StyledText';
import { useAuth } from '../../../providers/AuthProvider';
import { formValidationRules } from '../../../utils/formValidationRules';
import { Identifiers } from '../identifiers';
import { LoginFormFields } from '../types';
import { styles } from './styles';

export type Fields = Pick<LoginFormFields, 'authenticationCode'>;

export const StepCheckYourPhone: StepParams<LoginFormFields> = {
  identifier: Identifiers.PHONE_AUTHENTICATION,

  Component: ({ storeFields }: StepComponentProps<LoginFormFields>) => {
    const { actions, loading, user } = useAuth();

    const schema: Schema<Fields> = zod.object({
      authenticationCode: formValidationRules.authenticationCode,
    });
    const [error, setError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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

    useEffect(() => {
      if (user) {
        user.getUserAttributes((err, attributes) => {
          if (err instanceof Error) {
            setError(err.message);

            return;
          }

          const phoneNumber = attributes?.find(attr => attr.Name === 'phone_number')?.Value ?? '';
          const maskedPhoneNumber = `(xxx) xxxx-xx${phoneNumber.slice(-2)}`;
          setPhoneNumber(maskedPhoneNumber);
        });
      }
    }, [user]);

    return (
      <>
        <PaddedScrollView dark>
          <FormTitle
            dark
            headline="Check Your Phone"
            description={`Enter the SMS authentication code sent to your phone ${phoneNumber}.`}
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
        </PaddedScrollView>
        <Box
          px="default"
          fw
        >
          <Button
            disabled={shouldButtonBeDisabled}
            onPress={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </Box>
      </>
    );
  },
};
