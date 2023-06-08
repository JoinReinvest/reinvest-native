import { FlashList } from '@shopify/flash-list';
import React from 'react';

import { Box } from '../../components/Containers/Box/Box';
import { MainWrapper } from '../../components/MainWrapper';
import { StyledText } from '../../components/typography/StyledText';
import { useLogInNavigation } from '../../navigation/hooks';
import Screens from '../../navigation/screens';
import { yScale } from '../../utils/scale';
import { ESTIMATED_CARD_SIZE_BASE, PropertyCard } from './components/PropertyCard';
import { styles } from './styles';
import { mock, PropertyMock } from './types';

/*
  Base + bottom margin + content (paragraphSmall + bonusHeading + pill)
*/
const estimatedItemSize = ESTIMATED_CARD_SIZE_BASE + yScale(24) + yScale(8) + 34 + yScale(18);

export const ReitScreen = () => {
  const { navigate } = useLogInNavigation();

  const showDetails = (property: PropertyMock) => {
    navigate(Screens.PropertyDetails, { property });
  };

  return (
    <MainWrapper noPadding>
      <Box
        fw
        flex={1}
      >
        <FlashList<PropertyMock>
          estimatedItemSize={estimatedItemSize}
          ListHeaderComponent={() => (
            <Box
              pt="24"
              pb="16"
            >
              <StyledText variant="h5">Properties</StyledText>
            </Box>
          )}
          contentContainerStyle={styles.listWrapper}
          data={mock}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <PropertyCard
              property={item}
              onPress={showDetails}
            />
          )}
        />
      </Box>
    </MainWrapper>
  );
};
