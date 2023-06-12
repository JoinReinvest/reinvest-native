import React from 'react';

import { Carousel } from '../../components/Carousel';
import { Box } from '../../components/Containers/Box/Box';
import { MainWrapper } from '../../components/MainWrapper';
import { StyledText } from '../../components/typography/StyledText';
import { LogInProps } from '../../navigation/LogInNavigator/types';
import Screens from '../../navigation/screens';

const imagesMock = [
  'https://media.istockphoto.com/id/479842074/photo/empty-road-at-building-exterior.jpg?s=612x612&w=0&k=20&c=SbyfZGN0i2O_QPLCdBcu9vhuzbQvTz4bGEn-lIzrN0E=',
  'https://cdn.pixabay.com/photo/2017/04/24/13/37/architecture-2256489_1280.jpg',
  'https://img.freepik.com/premium-photo/geometric-facades-residential-building_294094-27.jpg',
  'https://images.unsplash.com/photo-1503951458645-643d53bfd90f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
];
export const PropertyDetails = ({ route }: LogInProps<Screens.PropertyDetails>) => {
  const { property } = route.params;

  return (
    <MainWrapper
      bottomSafe
      noPadding
    >
      <Carousel
        items={imagesMock}
        title={property.name}
      />
      <Box
        flex={1}
        fw
      >
        <StyledText>{property.name}</StyledText>
      </Box>
    </MainWrapper>
  );
};
