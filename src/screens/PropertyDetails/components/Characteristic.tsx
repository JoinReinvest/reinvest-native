import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Poi } from 'reinvest-app-common/src/types/graphql';

import { Box } from '../../../components/Containers/Box/Box';
import { Row } from '../../../components/Containers/Row';
import { StyledText } from '../../../components/typography/StyledText';
import { palette } from '../../../constants/theme';

interface Props {
  poi: Poi;
  underlined?: boolean;
}

export const Characteristic = ({ poi, underlined }: Props) => {
  return (
    <Row
      py="16"
      style={[underlined && styles.separator]}
      alignItems="center"
      pr="48"
    >
      <Box pr="12">
        <Image
          style={{ height: 52, width: 52 }}
          source={{ uri: poi.image ?? '' }}
        />
      </Box>
      <Box fw>
        <StyledText variant="button">{poi.name}</StyledText>
        <StyledText
          textAlign="left"
          color="dark2"
          variant="paragraph"
        >
          {poi.description}
        </StyledText>
      </Box>
    </Row>
  );
};

const styles = StyleSheet.create({
  separator: { borderBottomColor: palette.lightGray, borderBottomWidth: 1 },
});
