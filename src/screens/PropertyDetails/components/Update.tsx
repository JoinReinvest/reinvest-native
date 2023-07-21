import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Maybe, PortfolioUpdate } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { Avatar } from '../../../components/Avatar';
import { Box } from '../../../components/Containers/Box/Box';
import { Row } from '../../../components/Containers/Row';
import { StyledText } from '../../../components/typography/StyledText';
import { PADDED_SAFE_WIDTH } from '../../../constants/styles';
import { palette } from '../../../constants/theme';
import { xScale } from '../../../utils/scale';

const UPDATE_CONTENT_WIDTH = PADDED_SAFE_WIDTH - 44 - xScale(28);

export const Update = ({ update }: { update: Maybe<PortfolioUpdate> }) => {
  const date = formatDate(update?.createdAt, 'PROPERTY_UPDATE', { currentFormat: 'API_TZ' });

  return (
    <Row
      pb="24"
      style={styles.container}
    >
      <Box alignItems="center">
        <Box mb="16">
          <Avatar
            initials={update?.author?.avatar?.initials ?? ''}
            uri={update?.author?.avatar?.url ?? ''}
          />
        </Box>

        <Box
          flex={1}
          style={{ borderColor: palette.lightGray, borderWidth: 1, borderStyle: 'dashed' }}
        ></Box>
      </Box>
      <Box width={UPDATE_CONTENT_WIDTH}>
        <StyledText>{update?.title}</StyledText>

        <Box pt="4">
          <StyledText
            variant="paragraphSmall"
            color="dark3"
          >
            {date}
          </StyledText>
        </Box>
        {update?.image?.url && (
          <Box pt="16">
            <FastImage
              resizeMode="cover"
              /*
            avatar and separation + 12 for additional spacing (36) instead of default 24
             */
              style={styles.image}
              source={{ uri: update?.image?.url }}
            />
          </Box>
        )}
      </Box>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: { columnGap: xScale(16) },
  image: { height: 170, width: UPDATE_CONTENT_WIDTH },
});
