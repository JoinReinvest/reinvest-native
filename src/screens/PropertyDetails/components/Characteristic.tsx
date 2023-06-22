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
    >
      <Image
        style={{ height: 52, width: 52 }}
        source={{ uri: poi.image ?? '' }}
      />
      <Box pl="12">
        <StyledText variant="button">{poi.name}</StyledText>
        <StyledText
          color="dark2"
          variant="paragraphSmall"
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
