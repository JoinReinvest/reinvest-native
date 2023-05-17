import React from 'react';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { useUpdateProfileForVerification } from 'reinvest-app-common/src/services/queries/updateProfileForVerification';
import { AddressInput, DateOfBirthInput, DocumentFileLinkInput, DomicileInput } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';

export const Name = () => {
  const { data } = useGetUserProfile(getApiClient);
  const { mutateAsync } = useUpdateProfileForVerification(getApiClient);
  /*
    To cause validation fails after setting proper values, right now this one is not working  500 is returned from api
   */
  const onPress = async () => {
    await mutateAsync({
      input: {
        name: { firstName: 'test', lastName: 'test' },
        dateOfBirth: data?.details?.dateOfBirth as unknown as DateOfBirthInput,
        address: data?.details?.address as AddressInput,
        domicile: data?.details?.domicile as DomicileInput,
        idScan: data?.details?.idScan as DocumentFileLinkInput[],
      },
    });
  };

  return (
    <PaddedScrollView>
      <StyledText variant="h4">Profile Name</StyledText>
      {data?.details && (
        <>
          <StyledText variant="h4">{data?.details?.firstName || ''}</StyledText>
          <StyledText variant="h4">{data?.details?.lastName || ''}</StyledText>
          <Button onPress={onPress}>Set fake name </Button>
        </>
      )}
    </PaddedScrollView>
  );
};
