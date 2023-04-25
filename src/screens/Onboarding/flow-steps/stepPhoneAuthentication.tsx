import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useSetPhoneNumber } from 'reinvest-app-common/src/services/queries/setPhoneNumber';
import { useVerifyPhoneNumber } from 'reinvest-app-common/src/services/queries/verifyPhoneNumber';
import zod from 'zod';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { FormMessage } from '../../../components/Forms/FormMessage';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { LoadingSpinner } from '../../../components/Icon/icons';
import { FormModalDisclaimer } from '../../../components/Modals/ModalContent/FormModalDisclaimer';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { Controller } from '../../../components/typography/Controller';
import { StyledText } from '../../../components/typography/StyledText';
import { onBoardingDisclaimers, onBoardingModalHeadlines } from '../../../constants/strings';
import { useDialog } from '../../../providers/DialogProvider';
import { formValidationRules } from '../../../utils/formValidationRules';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

type Fields = Pick<OnboardingFormFields, 'phoneNumberAuthenticationCode'>;

const schema = zod.object({
  phoneNumberAuthenticationCode: formValidationRules.numberAuthenticationCode,
});

export const StepPhoneAuthentication: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.PHONE_AUTHENTICATION,

  doesMeetConditionFields: fields => {
    return allRequiredFieldsExists([fields.accountType, fields.phone]) && !fields._isPhoneCompleted;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();

    const [error, setError] = useState('');
    const { openDialog } = useDialog();

    const defaultValues: Fields = {
      phoneNumberAuthenticationCode: storeFields.phoneNumberAuthenticationCode || '',
    };
    const { formState, handleSubmit, control } = useForm<Fields>({
      defaultValues,
      resolver: zodResolver(schema),
    });
    const { isLoading: resendLoading, mutate: setPhoneNumberMutate } = useSetPhoneNumber(getApiClient);
    const { isLoading: verificationLoading, mutate: verifyPhoneNumber, isSuccess: verificationSuccess } = useVerifyPhoneNumber(getApiClient);

    useEffect(() => {
      if (verificationSuccess) {
        moveToNextStep();
      }
    }, [verificationSuccess, moveToNextStep]);

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || verificationLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ phoneNumberAuthenticationCode }) => {
      try {
        if (!phoneNumberAuthenticationCode) return;

        await updateStoreFields({
          phoneNumberAuthenticationCode,
          _hasAuthenticatedPhoneNumber: true,
        });

        if (storeFields.phone) {
          const { countryCode, number } = storeFields.phone;
          await verifyPhoneNumber({ phoneNumber: number || '', countryCode: countryCode || '', authCode: phoneNumberAuthenticationCode });

          await updateStoreFields({ _isPhoneCompleted: true });

          moveToNextStep();
        }
      } catch (err) {
        setError((err as Error).message);
      }
    };

    const resendCodeOnClick = async () => {
      const { countryCode, number } = storeFields.phone!;
      await setPhoneNumberMutate({ countryCode: countryCode || '', phoneNumber: number || '' });
    };

    const showGetHelp = () => {
      openDialog(
        <FormModalDisclaimer
          headline={onBoardingModalHeadlines.getHelpPhoneNumber}
          content={onBoardingDisclaimers.phoneNumberAuthenticationCodeGetHelp}
        />,
      );
    };

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView>
          <FormTitle
            dark
            headline="Check Your Phone"
            description={`Enter the SMS authentication code sent to your phone (xx) xxx-xxx-x${storeFields.phone?.number?.slice(-2)}.`}
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
            fieldName="phoneNumberAuthenticationCode"
            inputProps={{
              placeholder: 'Authentication Code',
              dark: true,
              maxLength: 6,
            }}
          />
          <View style={styles.row}>
            {resendLoading ? (
              <LoadingSpinner />
            ) : (
              <StyledText
                variant="link"
                color="frostGreen"
                onPress={resendCodeOnClick}
              >
                Resend Code
              </StyledText>
            )}
            <StyledText
              variant="link"
              color="frostGreen"
              onPress={showGetHelp}
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
