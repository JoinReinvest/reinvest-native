import { CognitoUser } from '@aws-amplify/auth';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Row } from '../../../../../components/Containers/Row';
import { FormMessage } from '../../../../../components/Forms/FormMessage';
import { PaddedScrollView } from '../../../../../components/PaddedScrollView';
import { Controller } from '../../../../../components/typography/Controller';
import { StyledText } from '../../../../../components/typography/StyledText';
import { useAuth } from '../../../../../providers/AuthProvider';
import { UpdatePasswordFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<UpdatePasswordFormFields, 'currentPassword'>;

export const StepCurrentPassword: StepParams<UpdatePasswordFormFields> = {
  identifier: Identifiers.CURRENT_PASSWORD,

  Component: ({ moveToNextStep, updateStoreFields }: StepComponentProps<UpdatePasswordFormFields>) => {
    const { user, actions } = useAuth();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);

    const { control, handleSubmit, formState } = useForm({
      mode: 'onBlur',
    });

    useEffect(() => {
      user?.getUserAttributes((err, attrs) => {
        if (err) {
          setError(err.message);
        }

        setEmail(attrs?.find(attr => attr.Name === 'email')?.Value ?? '');
      });
    }, [user]);

    const onSubmit: SubmitHandler<Fields> = async ({ currentPassword }) => {
      if (!currentPassword) {
        return;
      }

      setIsVerifying(true);

      try {
        const response = await actions.signIn(email, currentPassword);

        if (response instanceof Error) {
          setError(response.message.replace('username or', ''));
          setIsVerifying(false);
        }

        if (response instanceof CognitoUser) {
          await updateStoreFields({ currentPassword });
          moveToNextStep();
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }

        setIsVerifying(false);
      }
    };

    const shouldButtonBeDisabled = !formState.isValid || isVerifying;

    return (
      <Box
        fw
        flex={1}
      >
        <PaddedScrollView>
          <Row mb="16">
            <StyledText variant="paragraphEmp">Type your current password</StyledText>
          </Row>
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="currentPassword"
            inputProps={{ placeholder: 'Password' }}
          />
          {error && (
            <FormMessage
              variant="error"
              message={error}
            />
          )}
        </PaddedScrollView>
        <Box
          fw
          px="default"
        >
          <Button
            isLoading={isVerifying}
            onPress={handleSubmit(onSubmit)}
            disabled={shouldButtonBeDisabled}
          >
            Continue
          </Button>
        </Box>
      </Box>
    );
  },
};
