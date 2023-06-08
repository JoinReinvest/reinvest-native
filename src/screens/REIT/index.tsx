import React from 'react';
import { FlatList } from 'react-native';

import { Box } from '../../components/Containers/Box/Box';
import { MainWrapper } from '../../components/MainWrapper';
import { StyledText } from '../../components/typography/StyledText';
import { useLogInNavigation } from '../../navigation/hooks';
import Screens from '../../navigation/screens';
import { PropertyCard } from './PropertyCard';
import { styles } from './styles';
import { mock, PropertyMock } from './types';

export const ReitScreen = () => {
  const { navigate } = useLogInNavigation();

  const showDetails = (property: PropertyMock) => {
    navigate(Screens.PropertyDetails, { property });
  };

  return (
    <MainWrapper noPadding>
      <FlatList<PropertyMock>
        ListHeaderComponent={() => (
          <Box
            pt="24"
            pb="16"
          >
            <StyledText variant="h5">Properties</StyledText>
          </Box>
        )}
        style={styles.listWrapper}
        data={mock}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <PropertyCard
            property={item}
            onPress={showDetails}
          />
        )}
      />
    </MainWrapper>
  );
};
