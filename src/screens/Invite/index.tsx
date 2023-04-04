import React from 'react';
import { Share } from 'react-native';
import { useGetInvitationLink } from 'reinvest-app-common/src/services/queries/getInvitationLink';

import { apiClient } from '../../api/apiClient';
import { Box } from '../../components/Containers/Box/Box';
import { Input } from '../../components/Input';
import { MainWrapper } from '../../components/MainWrapper';
import { StyledText } from '../../components/typography/StyledText';
import { palette } from '../../constants/theme';

export const InviteScreen = () => {
  const { data, isLoading } = useGetInvitationLink(apiClient);

  const share = async () => {
    await Share.share({
      message: 'React Native | A framework for building native apps using React',
    });
  };

  return (
    <MainWrapper isLoading={isLoading}>
      <Box fw>
        <Box my={'24'}>
          <StyledText variant={'h5'}>Invite friends and family to REINVEST more!</StyledText>
        </Box>
        <StyledText variant="h5">Earn up to $10 for every referral</StyledText>
        {data && (
          <>
            <Box my={'16'}>{data && <StyledText variant="h4">Your Referral Code: {data?.url?.split('/').pop()}</StyledText>}</Box>
            <Input
              focusable={false}
              value={`${data.url}`}
            />
            <StyledText
              onPress={share}
              color={palette.dark3}
              variant="paragraph"
            >
              copy and share the link above
            </StyledText>
          </>
        )}
      </Box>
    </MainWrapper>
  );
};
