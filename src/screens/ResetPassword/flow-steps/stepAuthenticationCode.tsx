import {
  StepComponentProps,
  StepParams,
} from 'reinvest-app-common/src/form-flow/interfaces';
import {allRequiredFieldsExists} from '@utils/formValidator';
import zod, {Schema} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {SubmitHandler, useForm} from 'react-hook-form';
import {formValidationRules} from '@utils/formValidationRules';
import React, {useState} from 'react';
import {Controller} from '@components/typography/Controller';
import {Button} from '@components/Button';
import {FormTitle} from '@components/Forms/FormTitle';
import {styles} from './styles';
import {Alert, ScrollView, View} from 'react-native';
import {StyledText} from '@components/typography/StyledText';
import {palette} from '@constants/theme';
import {FormMessage} from '@components/Forms/FormMessage';
import {KeyboardAwareWrapper} from '@components/KeyboardAvareWrapper';
import {useAuth} from '@src/providers/AuthProvider';
import {ResetPasswordFormFields} from '../types';
import {CODE_MASK} from '@src/constants/masks';
import {Identifiers} from '../identifires';

type Fields = Pick<ResetPasswordFormFields, 'authenticationCode'>;

export const StepAuthenticationCode: StepParams<ResetPasswordFormFields> = {
  identifier: Identifiers.AUTHENTICATION_CODE,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email];
    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({
    storeFields,
    updateStoreFields,
    moveToNextStep,
  }: StepComponentProps<ResetPasswordFormFields>) => {
    const schema: Schema<Fields> = zod.object({
      authenticationCode: formValidationRules.authenticationCode,
    });
    const [error, setError] = useState<string | undefined>();
    const [infoMessage, setInfoMessage] = useState<string | undefined>();
    const {loading, actions} = useAuth();
    const {handleSubmit, control, formState} = useForm<Fields>({
      defaultValues: storeFields,
      resolver: zodResolver(schema),
    });
    const shouldButtonBeDisabled =
      !formState.isValid || formState.isSubmitting || loading;

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
      <KeyboardAwareWrapper style={styles.wrapper}>
        <ScrollView>
          <FormTitle
            dark
            headline={'Check Your Email'}
            description={subtitleMessage}
          />
          {error && <FormMessage variant={'error'} message={error} />}
          {infoMessage && (
            <FormMessage variant={'info'} message={infoMessage} />
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
              variant={'link'}
              color={palette.frostGreen}>
              Resend Code
            </StyledText>
            <StyledText
              onPress={() => Alert.alert('Get Help')}
              variant={'link'}
              color={palette.frostGreen}>
              Get Help
            </StyledText>
          </View>
        </ScrollView>
        <View key={'buttons_section'} style={styles.buttonsSection}>
          <Button
            disabled={shouldButtonBeDisabled}
            onPress={handleSubmit(onSubmit)}>
            Continue
          </Button>
        </View>
      </KeyboardAwareWrapper>
    );
  },
};
