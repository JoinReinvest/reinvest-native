import React, { useEffect, useState } from 'react';
import { Share, View } from 'react-native';
import { useGetInvitationLink } from 'reinvest-app-common/src/services/queries/getInvitationLink';

import { getApiClient } from '../../api/getApiClient';
import { Button } from '../../components/Button';
import { Box } from '../../components/Containers/Box/Box';
import { Icon } from '../../components/Icon';
import { Input } from '../../components/Input';
import { MainWrapper } from '../../components/MainWrapper';
import { PaddedScrollView } from '../../components/PaddedScrollView';
import { StyledText } from '../../components/typography/StyledText';
import { DEVICE_WIDTH, height, yScale } from '../../utils/scale';

export const InviteScreen = () => {
  const { data, isLoading, isSuccess } = useGetInvitationLink(getApiClient);
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
  }, [data?.url, isSuccess]);

  return (
    <>
      <MainWrapper
        isLoading={isLoading}
        isScroll
      >
        <Box
          style={{
            backgroundColor: 'black',
            height: 96,
            width: 96,
            borderRadius: 96,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: yScale(64),
          }}
        >
          <Icon
            size="l"
            icon="gift"
            color="white"
          />
        </Box>
        <Box fw>
          <Box mb="40">
            <StyledText
              variant="h4"
              style={{ textAlign: 'center' }}
            >
              Invite friends and family to REINVEST more!
            </StyledText>
          </Box>
          <StyledText
            variant="bonusHeading"
            style={{ textAlign: 'center' }}
          >
            Earn up to $10 for every referral
          </StyledText>
          <>
            <Box
              mt="16"
              mb="24"
            >
              {data && (
                <StyledText
                  variant="paragraphLarge"
                  style={{ textAlign: 'center' }}
                >
                  Your Referral Code: {data?.url?.split('/').pop()}
                </StyledText>
              )}
            </Box>
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', columnGap: 8 }}>
              <Input
                dataDetectorTypes={'link'}
                value={`${url}`}
                onChangeText={setUrl}
                wrapperStyle={{ maxWidth: DEVICE_WIDTH - 100 }}
              />
              <Button style={{ width: 48, height: 48 }}>
                <Icon icon="share" />
              </Button>
            </View>
            <StyledText
              onPress={share}
              color="dark2"
              variant="paragraph"
            >
              click above to copy the link
            </StyledText>
          </>
        </Box>
      </MainWrapper>
      <Box
        fw
        pb="24"
        px="24"
        style={{ backgroundColor: 'white' }}
      >
        <Button>Dashboard</Button>
      </Box>
    </>
  );
};
