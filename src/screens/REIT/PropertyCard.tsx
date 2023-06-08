import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

import { Box } from '../../components/Containers/Box/Box';
import { Row } from '../../components/Containers/Row';
import { Icon } from '../../components/Icon';
import { StyledText } from '../../components/typography/StyledText';
import { PADDED_SAFE_WIDTH } from '../../constants/styles';
import { gradients, palette } from '../../constants/theme';
import { yScale } from '../../utils/scale';
import { PropertyMock } from './types';

type Props = {
  onPress: (item: PropertyMock) => void;
  property: PropertyMock;
};
export const PropertyCard = ({ property, onPress }: Props) => {
  const getImageDimensions = useCallback(() => {
    return { width: '100%', height: (PADDED_SAFE_WIDTH * 9) / 16 };
  }, []);

  return (
    <Box
      fw
      style={[cardStyles.card]}
      onPress={() => onPress(property)}
    >
      {property.image && (
        <FastImage
          source={{ uri: property.image }}
          style={getImageDimensions()}
        />
      )}
      <Box
        style={cardStyles.description}
        px="16"
        py="12"
        fw
      >
        <Row justifyContent="space-between">
          <Box>
            <StyledText variant="bonusHeading">{property.name}</StyledText>
            <Box />
            <StyledText
              variant="paragraph"
              color="dark3"
            >
              {property.address}
            </StyledText>
          </Box>
          <Icon
            icon="arrowRight"
            color={palette.dark3}
          ></Icon>
        </Row>
        <Row
          fw
          pt="8"
          justifyContent={'space-between'}
        >
          <Row>
            <StyledText
              variant="paragraph"
              color="dark3"
            >
              Project Return:
            </StyledText>
            <StyledText variant="paragraph"> {property.returnValue}</StyledText>
          </Row>
          <Box
            height={yScale(18)}
            width={60}
            radius={18}
            justifyContent={'center'}
            style={cardStyles.ratingPill}
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
      </Box>
    </Box>
  );
};

export const cardStyles = StyleSheet.create({
  card: {
    marginBottom: yScale(24),
  },
  description: {
    borderColor: palette.lightGray,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  ratingPill: { overflow: 'hidden' },
});
