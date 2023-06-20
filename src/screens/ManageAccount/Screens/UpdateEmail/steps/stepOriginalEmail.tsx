import React, { useLayoutEffect, useState } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Loader } from '../../../../../components/Loader';
import { StyledText } from '../../../../../components/typography/StyledText';
import { useAuth } from '../../../../../providers/AuthProvider';
import { UpdateEmailFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepOriginalEmail: StepParams<UpdateEmailFormFields> = {
  identifier: Identifiers.ORIGINAL_EMAIL,

  Component: ({ moveToNextStep }: StepComponentProps<UpdateEmailFormFields>) => {
    const { user } = useAuth();
    const [email, setEmail] = useState('');

    useLayoutEffect(() => {
      user?.getUserAttributes((err, attrs) => setEmail(attrs?.find(attr => attr.Name === 'email')?.Value ?? ''));
    }, [user]);

    return (
      <Box
        fw
        flex={1}
        px="default"
      >
        <Box
          fw
          flex={1}
        >
          <Box mb="16">
            <StyledText>Your email address</StyledText>
          </Box>
          {email ? <StyledText variant="paragraphEmp">{email}</StyledText> : <Loader />}
        </Box>
        <Box fw>
          <Button
            onPress={moveToNextStep}
            disabled={!email}
          >
            Update Email Address
          </Button>
        </Box>
      </Box>
    );
  },
};
