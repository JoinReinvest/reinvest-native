import React from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';

import { getApiClient } from '../../../../../api/getApiClient';
import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Loader } from '../../../../../components/Loader';
import { StyledText } from '../../../../../components/typography/StyledText';
import { AddressFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const AddressInfo: StepParams<AddressFields> = {
  identifier: Identifiers.ADDRESS_INFO,

  Component: ({ moveToNextStep }: StepComponentProps<AddressFields>) => {
    const { data, isLoading, isRefetching } = useGetUserProfile(getApiClient);
    const address = data?.details?.address;

    return (
      <Box
        fw
        flex={1}
        px={'default'}
      >
        <Box
          fw
          flex={1}
          pt="8"
        >
          <StyledText variant="paragraph">Your current address:</StyledText>
          {(isLoading || isRefetching) && <Loader />}
          {address && (
            <Box mt="16">
              <StyledText variant="paragraphEmp">{`${address.addressLine1}\n${address.addressLine2}\n${address.city}, ${address.state}\n${address.zip}`}</StyledText>
            </Box>
          )}
        </Box>
        <Box fw>
          <Button onPress={moveToNextStep}>Update Address</Button>
        </Box>
      </Box>
    );
  },
};
