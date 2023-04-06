import React, { useEffect, useState } from 'react';
import { Share } from 'react-native';
import { useGetInvitationLink } from 'reinvest-app-common/src/services/queries/getInvitationLink';

import { apiClient } from '../../api/apiClient';
import { Box } from '../../components/Containers/Box/Box';
import { Input } from '../../components/Input';
import { MainWrapper } from '../../components/MainWrapper';
import { StyledText } from '../../components/typography/StyledText';
import { palette } from '../../constants/theme';

export const InviteScreen = () => {
  const { data, isLoading, isSuccess } = useGetInvitationLink(apiClient);
  const [url, setUrl] = useState<undefined | string>('');

  const share = async () => {
    await Share.share({
      message: `${url}`,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setUrl(data?.url || '');
    }
  }, [isSuccess]);

  return (
    <MainWrapper
      isLoading={isLoading}
      isScroll
    >
      <Box fw>
        <Box my={'24'}>
          <StyledText variant={'h5'}>Invite friends and family to REINVEST more!</StyledText>
        </Box>
        <StyledText variant="h5">Earn up to $10 for every referral</StyledText>
        <>
          <Box my={'16'}>{data && <StyledText variant="h4">Your Referral Code: {data?.url?.split('/').pop()}</StyledText>}</Box>
          <Input
            dataDetectorTypes={'link'}
            value={`${url}`}
            onChangeText={setUrl}
          />
          <StyledText
            onPress={share}
            color={palette.dark3}
            variant="paragraph"
          >
            copy and share the link above
          </StyledText>
        </>
      </Box>
    </MainWrapper>
  );
};
