import React from 'react';

import {WelcomeScreenProps} from './HomeScreen.types';
import MainWrapper from '@components/MainWrapper/MainWrapper';
import StyledText from '@components/typography/StyledText/StyledText';

const HomeScreen = ({}: WelcomeScreenProps) => {
  return (
    <MainWrapper>
      <StyledText variant={'h1'}>Home</StyledText>
    </MainWrapper>
  );
};

export default HomeScreen;
