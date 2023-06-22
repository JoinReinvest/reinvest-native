import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { useGetPropertyDetails } from 'reinvest-app-common/src/services/queries/getPortfolioDetails';
import { Property } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../api/getApiClient';
import { Box } from '../../components/Containers/Box/Box';
import { MainWrapper } from '../../components/MainWrapper';
import { StyledText } from '../../components/typography/StyledText';
import { useLogInNavigation } from '../../navigation/hooks';
import Screens from '../../navigation/screens';
import { yScale } from '../../utils/scale';
import { ESTIMATED_CARD_SIZE_BASE, PropertyCard } from './components/PropertyCard';
import { styles } from './styles';

/*
  Base + bottom margin + content (paragraphSmall + bonusHeading + pill)
*/
const estimatedItemSize = ESTIMATED_CARD_SIZE_BASE + yScale(24) + yScale(8) + 34 + yScale(18);

export const ReitScreen = () => {
  const { navigate } = useLogInNavigation();
  const { data } = useGetPropertyDetails(getApiClient);

  const showDetails = (property: Property) => {
    navigate(Screens.PropertyDetails, { property });
  };

  return (
    <MainWrapper noPadding>
      <Box
        fw
        flex={1}
      >
        <FlashList<Property>
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
          data={(data?.properties as Property[]) ?? []}
          keyExtractor={({ name }, index) => name ?? index.toString()}
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
