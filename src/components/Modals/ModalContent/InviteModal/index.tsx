import React, { useEffect, useState } from 'react';
import { Share, View } from 'react-native';
import { useGetInvitationLink } from 'reinvest-app-common/src/services/queries/getInvitationLink';

import { getApiClient } from '../../../../api/getApiClient';
import { useLogInNavigation } from '../../../../navigation/hooks';
import Screens from '../../../../navigation/screens';
import { useDialog } from '../../../../providers/DialogProvider';
import { DEVICE_WIDTH } from '../../../../utils/scale';
import { Button } from '../../../Button';
import { Box } from '../../../Containers/Box/Box';
import { Icon } from '../../../Icon';
import { Input } from '../../../Input';
import { StyledText } from '../../../typography/StyledText';
import { styles } from './styles';

export const InviteModal = () => {
  const { data, isSuccess } = useGetInvitationLink(getApiClient);
  const { closeDialog } = useDialog();
  const navigation = useLogInNavigation();
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

  const returnToDashboard = () => {
    navigation.navigate(Screens.Dashboard);
    closeDialog();
  };

  return (
    <View style={[styles.center, styles.container]}>
      <View style={styles.center}>
        <Box style={styles.iconContainer}>
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
              style={styles.textCenter}
            >
              Invite friends and family to REINVEST more!
            </StyledText>
          </Box>
          <StyledText
            variant="subheading"
            style={styles.textCenter}
          >
            Earn up to $10 for every referral
          </StyledText>
          <Box>
            <Box
              mt="16"
              mb="24"
            >
              {data && (
                <StyledText
                  variant="paragraphLarge"
                  style={styles.textCenter}
                >
                  Your Referral Code: {data?.url?.split('/').pop()}
                </StyledText>
              )}
            </Box>
            <View style={styles.inputRow}>
              <Input
                // eslint-disable-next-line jsx-a11y/no-autofocus
                caretHidden
                pointerEvents="none"
                dataDetectorTypes={'link'}
                value={`${url}`}
                onChangeText={setUrl}
                predefined
                numberOfLines={1}
                wrapperStyle={{ maxWidth: DEVICE_WIDTH - 100, marginBottom: 0, alignSelf: 'center' }}
                nativeInputStyle={{ alignSelf: 'center' }}
                style={{ textAlignVertical: 'top', alignSelf: 'center' }}
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
          </Box>
        </Box>
      </View>
      <Box
        fw
        pb="24"
      >
        <Button onPress={returnToDashboard}>Dashboard</Button>
      </Box>
    </View>
  );
};
