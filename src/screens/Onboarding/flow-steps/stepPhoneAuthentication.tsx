import {zodResolver} from '@hookform/resolvers/zod';

import {formValidationRules} from '@utils/formValidationRules';

import React, {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {
  StepComponentProps,
  StepParams,
} from 'reinvest-app-common/src/services/form-flow/interfaces';
import zod from 'zod';

import {Identifiers} from '../identifiers';
import {Alert, ScrollView, View} from 'react-native';
import {Controller} from '@components/typography/Controller';
import {FormTitle} from '@components/Forms/FormTitle';
import {StyledText} from '@components/typography/StyledText';
import {palette} from '@constants/theme';
import {FormMessage} from '@components/Forms/FormMessage';
import {Button} from '@components/Button';
import {CODE_MASK} from '@src/constants/masks';
import {OnboardingFormFields} from '../types';
import {allRequiredFieldsExists} from 'reinvest-app-common/src/services/form-flow';
import {styles} from './styles';
import {ProgressBar} from '@src/components/ProgressBar';
import {useOnboardingFormFlow} from '.';

type Fields = Pick<OnboardingFormFields, 'phoneNumberAuthenticationCode'>;

const schema = zod.object({
  phoneNumberAuthenticationCode: formValidationRules.authenticationCode,
});

export const StepPhoneAuthentication: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.PHONE_AUTHENTICATION,

  doesMeetConditionFields: fields => {
    return allRequiredFieldsExists([fields.accountType, fields.phoneNumber]);
  },

  Component: ({
    storeFields,
    updateStoreFields,
    moveToNextStep,
  }: StepComponentProps<OnboardingFormFields>) => {
    const {progressPercentage} = useOnboardingFormFlow();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const defaultValues: Fields = {
      phoneNumberAuthenticationCode:
        storeFields.phoneNumberAuthenticationCode || '',
    };
    const {formState, handleSubmit, control} = useForm<Fields>({
      defaultValues,
      resolver: zodResolver(schema),
    });

    const shouldButtonBeDisabled =
      !formState.isValid || formState.isSubmitting || loading;

    const onSubmit: SubmitHandler<Fields> = async ({
      phoneNumberAuthenticationCode,
    }) => {
      try {
        if (!phoneNumberAuthenticationCode) return;
        setLoading(true);
        phoneNumberAuthenticationCode = phoneNumberAuthenticationCode.replace(
          '-',
          '',
        );
        // TODO: Add validation of the code
        await updateStoreFields({
          phoneNumberAuthenticationCode,
          _hasAuthenticatedPhoneNumber: true,
        });
        setLoading(false);
        moveToNextStep();
      } catch (err) {
        setError((err as Error).message);
      }
    };

    const resendCodeOnClick = async () => {
      // TODO: Implement resend code logic
      Alert.alert('Resend code');
    };

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <ScrollView style={[styles.fw]}>
          <FormTitle
            dark
            headline="Check Your Phone"
            description={`Enter the SMS authentication code sent to your phone (xx) xxx-xxx-x${storeFields.phoneNumber?.slice(
              -2,
            )}.`}
          />
          {error && <FormMessage message={error} variant={'error'} />}
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName={'phoneNumberAuthenticationCode'}
            inputProps={{
              placeholder: 'Authentication Code',
              dark: true,
              keyboardType: 'numeric',
              maxLength: 7, // xxx-xxx
              mask: CODE_MASK,
            }}
          />
          <View style={styles.row}>
            <StyledText
              variant={'link'}
              color={palette.frostGreen}
              onPress={resendCodeOnClick}>
              Resend Code
            </StyledText>
            <StyledText
              variant={'link'}
              color={palette.frostGreen}
              onPress={() => Alert.alert('Get help')}>
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
      </>
    );
  },
};
