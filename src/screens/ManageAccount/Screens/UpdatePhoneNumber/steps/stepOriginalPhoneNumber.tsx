import React, { useEffect, useState } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { parsePhoneNumber } from 'reinvest-app-common/src/utilities/phoneNumber';

import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Loader } from '../../../../../components/Loader';
import { StyledText } from '../../../../../components/typography/StyledText';
import { useAuth } from '../../../../../providers/AuthProvider';
import { UpdatePhoneNumberFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepOriginalPhoneNumber: StepParams<UpdatePhoneNumberFormFields> = {
  identifier: Identifiers.ORIGINAL_PHONE_NUMBER,

  Component: ({ moveToNextStep }: StepComponentProps<UpdatePhoneNumberFormFields>) => {
    const { user } = useAuth();
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
      user?.getUserAttributes((err, attrs) => setPhoneNumber(parsePhoneNumber(attrs?.find(attr => attr.Name === 'phone_number')?.Value ?? '').formatted));
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
            <StyledText>Your phone number</StyledText>
          </Box>
          {phoneNumber ? <StyledText variant="h6">{phoneNumber}</StyledText> : <Loader />}
        </Box>
        <Box fw>
          <Button
            onPress={moveToNextStep}
            disabled={!phoneNumber}
          >
            Update Phone Number
          </Button>
        </Box>
      </Box>
    );
  },
};
