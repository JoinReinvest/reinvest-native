import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Linking } from 'react-native';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useSetPhoneNumber } from 'reinvest-app-common/src/services/queries/setPhoneNumber';
import { useVerifyPhoneNumber } from 'reinvest-app-common/src/services/queries/verifyPhoneNumber';
import zod, { Schema } from 'zod';

import { getApiClient } from '../../../../../api/getApiClient';
import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Row } from '../../../../../components/Containers/Row';
import { FormMessage } from '../../../../../components/Forms/FormMessage';
import { FormTitle } from '../../../../../components/Forms/FormTitle';
import { UpdateSuccess } from '../../../../../components/Modals/ModalContent/UpdateSuccess';
import { HeaderWithLogo } from '../../../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { Controller } from '../../../../../components/typography/Controller';
import { StyledText } from '../../../../../components/typography/StyledText';
import { useLogInNavigation } from '../../../../../navigation/hooks';
import { useDialog } from '../../../../../providers/DialogProvider';
import { maskPhoneNumber } from '../../../../../utils/phoneNumber';
import { UpdatePhoneNumberFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<UpdatePhoneNumberFormFields, 'authenticationCode'>;

const schema: Schema<Fields> = zod.object({
  authenticationCode: formValidationRules.authenticationCode,
});

export const StepAuthenticationCode: StepParams<UpdatePhoneNumberFormFields> = {
  identifier: Identifiers.AUTHENTICATION_CODE,

  doesMeetConditionFields: ({ phoneNumber, countryCode }) => {
    return !!phoneNumber && !!countryCode;
  },

  Component: ({ storeFields }: StepComponentProps<UpdatePhoneNumberFormFields>) => {
    const [error, setError] = useState<string | undefined>();
    const { goBack } = useLogInNavigation();
    const { mutate: verifyPhoneNumber, isSuccess, isLoading: verificationLoading } = useVerifyPhoneNumber(getApiClient);
    const { mutateAsync: setPhoneNumberMutate } = useSetPhoneNumber(getApiClient);
    const { openDialog } = useDialog();

    const { handleSubmit, control, formState } = useForm<Fields>({
      defaultValues: storeFields,
      resolver: zodResolver(schema),
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || verificationLoading;

    const onSubmit: SubmitHandler<Fields> = fields => {
      try {
        verifyPhoneNumber({
          phoneNumber: storeFields.phoneNumber?.split('-').join('') ?? '',
          countryCode: storeFields.countryCode ?? '',
          authCode: fields.authenticationCode ?? '',
        });
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    };

    const resendCodeOnClick = async () => {
      await setPhoneNumberMutate({ countryCode: storeFields.countryCode ?? '', phoneNumber: storeFields.phoneNumber?.split('-').join('') ?? '' });
    };

    const openMail = () => Linking.openURL('mailto:support@reinvestcommunity.com');

    useEffect(() => {
      if (isSuccess) {
        openDialog(<UpdateSuccess info="Your phone number is updated" />, { showLogo: true, header: <HeaderWithLogo onClose={goBack} /> });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);

    return (
      <>
        <Box
          fw
          flex={1}
        >
          <FormTitle
            dark
            headline="Check Your Phone"
            description={`Enter the SMS authentication code sent to your phone ${maskPhoneNumber(
              storeFields.countryCode ?? '',
              storeFields.phoneNumber ?? '',
            )}.`}
          />
          {error && (
            <FormMessage
              variant="error"
              message={error}
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
