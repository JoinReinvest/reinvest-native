import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Linking } from 'react-native';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import zod, { Schema } from 'zod';

import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Row } from '../../../../../components/Containers/Row';
import { FormMessage } from '../../../../../components/Forms/FormMessage';
import { FormTitle } from '../../../../../components/Forms/FormTitle';
import { Controller } from '../../../../../components/typography/Controller';
import { StyledText } from '../../../../../components/typography/StyledText';
import { useLogInNavigation } from '../../../../../navigation/hooks';
import Screens from '../../../../../navigation/screens';
import { useAuth } from '../../../../../providers/AuthProvider';
import { UpdateEmailFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
type Fields = Pick<UpdateEmailFormFields, 'authenticationCode'>;

export const StepAuthenticationCode: StepParams<UpdateEmailFormFields> = {
  identifier: Identifiers.AUTHENTICATION_CODE,

  doesMeetConditionFields: ({ email }) => {
    return !!email;
  },

  Component: ({ storeFields }: StepComponentProps<UpdateEmailFormFields>) => {
    const schema: Schema<Fields> = zod.object({
      authenticationCode: formValidationRules.authenticationCode,
    });
    const { user } = useAuth();
    const { navigate } = useLogInNavigation();
    const [error, setError] = useState<string | undefined>();
    const [infoMessage, setInfoMessage] = useState<string | undefined>();

    const { handleSubmit, control, formState } = useForm<Fields>({
      defaultValues: storeFields,
      resolver: zodResolver(schema),
    });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const subtitleMessage = `Enter the email authentication code sent to your email ${storeFields.email}.`;

    const onSubmit: SubmitHandler<Fields> = fields =>
      user?.verifyAttribute('email', fields.authenticationCode ?? '', {
        onSuccess() {
          navigate(Screens.BottomNavigator, { screen: Screens.Dashboard });
        },
        onFailure(err) {
          setError(err.message);
        },
      });

    const resendCodeOnClick = async () => {
      try {
        user?.updateAttributes([{ Name: 'email', Value: storeFields.email ?? '' }], err => {
          if (err) {
            setError((err as Error).message);

            return;
          }
        });
        setInfoMessage('Code has been sent');
      } catch (err) {
        setError((err as Error).message);
      }
    };

    const openMail = () => Linking.openURL('mailto:support@reinvestcommunity.com');

    return (
      <>
        <Box
          fw
          flex={1}
        >
          <FormTitle
            dark
            headline="Check Your Email"
            description={subtitleMessage}
          />
          {error && (
            <FormMessage
              variant="error"
              message={error}
            />
          )}
          {infoMessage && (
            <FormMessage
              variant="info"
              message={infoMessage}
            />
          )}
          <Controller
            fieldName="authenticationCode"
            control={control}
            onSubmit={handleSubmit(onSubmit)}
            inputProps={{
              dark: true,
              placeholder: 'Authentication Code',
              maxLength: 6,
              keyboardType: 'number-pad',
              returnKeyType: 'done',
            }}
          />
          <Row
            justifyContent="space-between"
            fw
          >
            <StyledText
              onPress={resendCodeOnClick}
              variant="link"
              color="frostGreen"
            >
              Resend Code
            </StyledText>
            <StyledText
              onPress={openMail}
              variant="link"
              color="frostGreen"
            >
              Get Help
            </StyledText>
          </Row>
        </Box>
        <Box>
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
