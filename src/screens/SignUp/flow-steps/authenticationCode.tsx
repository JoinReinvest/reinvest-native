import {
  StepComponentProps,
  StepParams,
} from 'reinvest-app-common/src/services/form-flow/interfaces';
import {allRequiredFieldsExists} from '@utils/formValidator';
import zod, {Schema} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {SubmitHandler, useForm} from 'react-hook-form';
import {formValidationRules} from '@utils/formValidationRules';
import React, {useState} from 'react';
import {RegisterFormFields} from '@screens/SignUp/types';
import {Identifiers} from '@screens/SignUp/identifiers';
import {Auth} from '@aws-amplify/auth';
import {Controller} from '@components/typography/Controller';
import {Button} from '@components/Button';
import {FormTitle} from '@components/Forms/FormTitle';
import {styles} from '@screens/SignUp/flow-steps/styles';
import {Alert, ScrollView, View} from 'react-native';
import {StyledText} from '@components/typography/StyledText';
import {palette} from '@constants/theme';
import {FormMessage} from '@components/Forms/FormMessage';
import {KeyboardAwareWrapper} from '@components/KeyboardAvareWrapper';
import {CODE_MASK} from '@src/constants/masks';

type Fields = Pick<RegisterFormFields, 'authenticationCode'>;

export const StepAuthenticationCode: StepParams<RegisterFormFields> = {
  identifier: Identifiers.AUTHENTICATION_CODE,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.password];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({
    storeFields,
    updateStoreFields,
    moveToNextStep,
  }: StepComponentProps<RegisterFormFields>) => {
    const schema: Schema<Fields> = zod.object({
      authenticationCode: formValidationRules.authenticationCode,
    });
    const [error, setError] = useState<string | undefined>();
    const [infoMessage, setInfoMessage] = useState<string | undefined>();

    const {handleSubmit, control, formState} = useForm<Fields>({
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
              maxLength: 7,
              keyboardType: 'number-pad',
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
            Sign Up
          </Button>
        </View>
      </KeyboardAwareWrapper>
    );
  },
};
