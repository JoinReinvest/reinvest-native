import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { Avatar } from '../../../components/Avatar';
import { Box } from '../../../components/Containers/Box/Box';
import { Row } from '../../../components/Containers/Row';
import { StyledText } from '../../../components/typography/StyledText';
import { PADDED_SAFE_WIDTH } from '../../../constants/styles';
import { palette } from '../../../constants/theme';
import { xScale } from '../../../utils/scale';
import { UpdateT } from '../types';

const UPDATE_CONTENT_WIDTH = PADDED_SAFE_WIDTH - 44 - xScale(28);
export const Update = ({ update: { author, date, content } }: { update: UpdateT }) => {
  return (
    <Row
      pb="24"
      style={styles.container}
    >
      <Box alignItems="center">
        <Box mb="16">
          <Avatar
            initials={''}
            uri={author.uri}
          />
        </Box>

        <Box
          flex={1}
          style={{ borderColor: palette.lightGray, borderWidth: 1, borderStyle: 'dashed' }}
        ></Box>
      </Box>
      <Box width={UPDATE_CONTENT_WIDTH}>
        <StyledText>{content.info}</StyledText>
        <Box pt="4">
          <StyledText
            variant="paragraphSmall"
            color="dark3"
          >
            {formatDate(date, 'PROPERTY_UPDATE', { currentFormat: 'CHART' })}
          </StyledText>
        </Box>
        {content.image && (
          <Box pt="16">
            <FastImage
              resizeMode="cover"
              /*
            avatar and separation + 12 for additional spacing (36) instead of default 24
             */
              style={styles.image}
              source={{ uri: content.image }}
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
