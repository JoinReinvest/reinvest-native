import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import zod, { Schema } from 'zod';

import { Button } from '../../../../../components/Button';
import { PasswordChecklist } from '../../../../../components/CheckList/PasswordCheckList';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Row } from '../../../../../components/Containers/Row';
import { FormMessage } from '../../../../../components/Forms/FormMessage';
import { MainWrapper } from '../../../../../components/MainWrapper';
import { UpdateSuccess } from '../../../../../components/Modals/ModalContent/UpdateSuccess';
import { HeaderWithLogo } from '../../../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { PaddedScrollView } from '../../../../../components/PaddedScrollView';
import { Controller } from '../../../../../components/typography/Controller';
import { StyledText } from '../../../../../components/typography/StyledText';
import { useLogInNavigation } from '../../../../../navigation/hooks';
import Screens from '../../../../../navigation/screens';
import { useAuth } from '../../../../../providers/AuthProvider';
import { useDialog } from '../../../../../providers/DialogProvider';
import { UpdatePasswordFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<UpdatePasswordFormFields, 'newPassword' | 'confirmNewPassword'>;

const schema: Schema<Fields> = zod
  .object({
    newPassword: formValidationRules.password,
    confirmNewPassword: formValidationRules.confirm_password,
  })
  .refine(({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  });

export const StepNewPassword: StepParams<UpdatePasswordFormFields> = {
  identifier: Identifiers.CURRENT_PASSWORD,

  doesMeetConditionFields({ currentPassword }) {
    return !!currentPassword;
  },

  Component: ({ storeFields: { currentPassword } }: StepComponentProps<UpdatePasswordFormFields>) => {
    const { goBack } = useLogInNavigation();

    const { user } = useAuth();
    const { control, handleSubmit, formState, setFocus, watch } = useForm({
      mode: 'onBlur',
      resolver: zodResolver(schema),
    });
    const { openDialog } = useDialog();
    const [error, setError] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const onSubmit: SubmitHandler<Fields> = async ({ newPassword, confirmNewPassword }) => {
      if (!newPassword || !confirmNewPassword || !currentPassword) {
        return;
      }

      if (newPassword === currentPassword) {
        setError('New password cannot be same as the old one!');

        return;
      }

      setIsUpdating(true);

      user?.changePassword(currentPassword, newPassword, (err, res) => {
        if (err instanceof Error) {
          setError(err.message);
          setIsUpdating(false);

          return;
        }

        if (res === 'SUCCESS') {
          setError('');
          setIsUpdating(false);

          const header = <HeaderWithLogo onClose={goBack} />;
          openDialog(<UpdateSuccess info="Your password is updated" />, {
            showLogo: true,
            header,
            closeIcon: false,
          });
        }
      });
    };

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const watchedNewPassword = watch('newPassword');
    const watchedConfirmNewPassword = watch('confirmNewPassword');

    return (
      <Box
        fw
        flex={1}
      >
        <PaddedScrollView>
          <Row mb="16">
            <StyledText variant="paragraphEmp">Type your new password</StyledText>
          </Row>
          {error && (
            <FormMessage
              variant="error"
              message={error}
            />
          )}
          <Controller
            inputProps={{
              placeholder: 'Password',
              returnKeyType: 'next',
            }}
            fieldName="newPassword"
            control={control}
            onSubmit={() => setFocus('newPassword')}
          />
          <Controller
            inputProps={{
              placeholder: 'Repeat Password',
              returnKeyType: 'done',
            }}
            fieldName="confirmNewPassword"
            control={control}
            onSubmit={handleSubmit(onSubmit)}
          />
          <PasswordChecklist
            dark={false}
            password={watchedNewPassword}
            passwordConfirmation={watchedConfirmNewPassword}
          />
        </PaddedScrollView>
        <Box
          fw
          px="default"
        >
          <Button
            isLoading={isUpdating}
            onPress={handleSubmit(onSubmit)}
            disabled={shouldButtonBeDisabled}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    );
  },
};
