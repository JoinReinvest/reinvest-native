import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import zod, { Schema } from 'zod';

import { Button } from '../../../components/Button';
import { FormMessage } from '../../../components/Forms/FormMessage';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { Controller } from '../../../components/typography/Controller';
import { StyledText } from '../../../components/typography/StyledText';
import { CODE_MASK } from '../../../constants/masks';
import { palette } from '../../../constants/theme';
import { useAuth } from '../../../providers/AuthProvider';
import { formValidationRules } from '../../../utils/formValidationRules';
import { allRequiredFieldsExists } from '../../../utils/formValidator';
import { Identifiers } from '../identifires';
import { ResetPasswordFormFields } from '../types';
import { styles } from './styles';

type Fields = Pick<ResetPasswordFormFields, 'authenticationCode'>;

export const StepAuthenticationCode: StepParams<ResetPasswordFormFields> = {
  identifier: Identifiers.AUTHENTICATION_CODE,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<ResetPasswordFormFields>) => {
    const schema: Schema<Fields> = zod.object({
      authenticationCode: formValidationRules.authenticationCode,
    });
    const [error, setError] = useState<string | undefined>();
    const [infoMessage, setInfoMessage] = useState<string | undefined>();
    const { loading, actions } = useAuth();
    const { handleSubmit, control, formState } = useForm<Fields>({
      defaultValues: storeFields,
      resolver: zodResolver(schema),
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || loading;

    const subtitleMessage = `Enter the email authentication code sent to your email ${storeFields.email}.`;

    const onSubmit: SubmitHandler<Fields> = fields => {
      fields.authenticationCode = fields.authenticationCode.replace('-', '');
      updateStoreFields(fields);
      moveToNextStep();
    };

    const resendCodeOnClick = async () => {
      try {
        await actions.forgotPassword(storeFields.email);
        setInfoMessage('Code has been sent');
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    };

    return (
      <>
        <PaddedScrollView dark>
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
              keyboardType: 'numeric',
              maxLength: 7,
              mask: CODE_MASK,
            }}
          />
          <View style={styles.row}>
            <StyledText
              onPress={resendCodeOnClick}
              variant="link"
              color={palette.frostGreen}
            >
              Resend Code
            </StyledText>
            <StyledText
              onPress={() => Alert.alert('Get Help')}
              variant="link"
              color={palette.frostGreen}
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
            Continue
          </Button>
        </View>
      </>
    );
  },
};
