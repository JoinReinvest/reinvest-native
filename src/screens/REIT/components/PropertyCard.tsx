import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Box } from '../../../components/Containers/Box/Box';
import { Row } from '../../../components/Containers/Row';
import { Icon } from '../../../components/Icon';
import { ImageCard } from '../../../components/ImageCard';
import { StyledText } from '../../../components/typography/StyledText';
import { PADDED_SAFE_WIDTH } from '../../../constants/styles';
import { gradients, palette } from '../../../constants/theme';
import { yScale } from '../../../utils/scale';
import { PropertyMock } from '../types';
import { styles } from './styles';

export const ESTIMATED_CARD_SIZE_BASE = (PADDED_SAFE_WIDTH * 9) / 16 + yScale(24);

type Props = {
  onPress: (item: PropertyMock) => void;
  property: PropertyMock;
};
export const PropertyCard = ({ property, onPress }: Props) => {
  return (
    <ImageCard
      style={styles.card}
      onPress={() => onPress(property)}
      uri={property.image}
    >
      <Row justifyContent="space-between">
        <Box>
          <StyledText variant="bonusHeading">{property.name}</StyledText>
          <Box />
          <StyledText
            variant="paragraphSmall"
            color="dark3"
          >
            {property.address}
          </StyledText>
        </Box>
        <Icon
          icon="arrowRight"
          color={palette.dark3}
        />
      </Row>
      <Row
        fw
        pt="8"
        justifyContent={'space-between'}
      >
        <Row>
          <StyledText
            variant="paragraphSmall"
            color="dark3"
          >
            Project Return:
          </StyledText>
          <StyledText variant="paragraphSmall"> {property.returnValue}</StyledText>
        </Row>
        <Box
          height={yScale(18)}
          width={60}
          radius={18}
          justifyContent={'center'}
          style={styles.ratingPill}
        >
          <LinearGradient
            useAngle={true}
            angle={90}
            colors={gradients.frostToWhite}
            style={{ ...StyleSheet.absoluteFillObject }}
          />
          <StyledText
            variant="today"
            textAlign={'center'}
          >{`Rating ${property.rating}`}</StyledText>
        </Box>
      </Row>
    </ImageCard>
  );
};
