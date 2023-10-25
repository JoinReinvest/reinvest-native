import React from 'react';
import { Linking } from 'react-native';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { Row } from '../../../components/Containers/Row';
import { Icon } from '../../../components/Icon';
import { MainWrapper } from '../../../components/MainWrapper';
import { StyledText } from '../../../components/typography/StyledText';

export const RemoveProfile = () => {
  return (
    <MainWrapper bottomSafe>
      <Box
        flex={1}
        fw
        mt="24"
      >
        <Row
          fw
          justifyContent="flex-start"
          alignItems="center"
          style={{ marginLeft: -8 }}
        >
          <Icon
            icon="info"
            size="s"
          />
          <StyledText>To remove account contact us at:</StyledText>
        </Row>
        <StyledText variant="h6">support@reinvestcommunity.com</StyledText>
      </Box>
      <Button onPress={() => Linking.openURL('mailto:support@reinvestcommunity.com')}>Contact Us</Button>
    </MainWrapper>
  );
};
