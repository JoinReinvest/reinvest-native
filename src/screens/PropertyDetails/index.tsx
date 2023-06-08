import React from 'react';

import { Box } from '../../components/Containers/Box/Box';
import { MainWrapper } from '../../components/MainWrapper';
import { StyledText } from '../../components/typography/StyledText';
import { LogInProps } from '../../navigation/LogInNavigator/types';
import Screens from '../../navigation/screens';

export const PropertyDetails = ({ route }: LogInProps<Screens.PropertyDetails>) => {
  const { property } = route.params;

  return (
    <MainWrapper
      noPadding
      bottomSafe
    >
      <Box
        flex={1}
        fw
      >
        <StyledText>{property.name}</StyledText>
      </Box>
    </MainWrapper>
  );
};
