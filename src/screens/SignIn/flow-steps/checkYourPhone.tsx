import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Linking, View } from 'react-native';
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

const schema: Schema<Fields> = zod.object({
  authenticationCode: formValidationRules.authenticationCode,
});

const maskPhoneNumber = (phoneNumber: string) => {
  const lastTwoDigits = phoneNumber.slice(-2);

  if (phoneNumber.length > 9) {
    return `(xxx) xxx-xx${lastTwoDigits}`;
  }

  return `(xxx) xxx-x${lastTwoDigits}`;
};

export const StepCheckYourPhone: StepParams<LoginFormFields> = {
  identifier: Identifiers.PHONE_AUTHENTICATION,

  Component: ({ storeFields }: StepComponentProps<LoginFormFields>) => {
    const { actions, loading, user } = useAuth();
    const [infoMessage, setInfoMessage] = useState('');
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

    const resendCodeOnClick = async () => {
      try {
        await actions.signIn(storeFields.email, storeFields.password);

        setInfoMessage('Code has been sent');
      } catch (err) {
        setError((err as Error).message);
      }
    };

    const shouldButtonBeDisabled = !formState.isValid || loading;

    // @ts-expect-error - cognito wraps the CognitoUser class
    const phoneNumber = maskPhoneNumber(user.challengeParam?.CODE_DELIVERY_DESTINATION);

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
          {infoMessage && (
            <FormMessage
              message={infoMessage}
              variant="info"
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
              onPress={resendCodeOnClick}
            >
              Resend Code
            </StyledText>
            <StyledText
              variant="link"
              color="frostGreen"
              onPress={() => Linking.openURL('mailto:support@reinvestcommunity.com')}
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
