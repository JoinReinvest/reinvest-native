import { Auth } from '@aws-amplify/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Linking, View } from 'react-native';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import zod, { Schema } from 'zod';

import { Button } from '../../../components/Button';
import { FormMessage } from '../../../components/Forms/FormMessage';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { Controller } from '../../../components/typography/Controller';
import { StyledText } from '../../../components/typography/StyledText';
import { formValidationRules } from '../../../utils/formValidationRules';
import { Identifiers } from '../identifiers';
import { RegisterFormFields } from '../types';
import { styles } from './styles';

type Fields = Pick<RegisterFormFields, 'authenticationCode'>;

export const StepAuthenticationCode: StepParams<RegisterFormFields> = {
  identifier: Identifiers.AUTHENTICATION_CODE,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.password];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<RegisterFormFields>) => {
    const schema: Schema<Fields> = zod.object({
      authenticationCode: formValidationRules.authenticationCode,
    });
    const [error, setError] = useState<string | undefined>();
    const [infoMessage, setInfoMessage] = useState<string | undefined>();

    const { handleSubmit, control, formState } = useForm<Fields>({
      defaultValues: storeFields,
      resolver: zodResolver(schema),
    });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const subtitleMessage = `Enter the email authentication code sent to your email ${storeFields.email}.`;

    const onSubmit: SubmitHandler<Fields> = fields => {
      fields.authenticationCode = fields.authenticationCode.replace('-', '');
      updateStoreFields(fields);
      moveToNextStep();
    };

    const resendCodeOnClick = async () => {
      try {
        await Auth.resendSignUp(storeFields.email);
        setInfoMessage('Code has been sent');
      } catch (err) {
        setError((err as Error).message);
      }
    };

    const openMail = () => Linking.openURL('mailto:support@reinvestcommunity.com');

    return (
      <>
        <PaddedScrollView>
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
          <View style={styles.row}>
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
          </View>
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            disabled={shouldButtonBeDisabled}
            onPress={handleSubmit(onSubmit)}
          >
            Sign Up
          </Button>
        </View>
      </>
    );
  },
};
