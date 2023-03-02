import React from 'react';

import {WelcomeScreenProps} from './Registration.types';
import MainWrapper from '@components/MainWrapper/MainWrapper';
import StyledText from '@components/typography/StyledText/StyledText';

const Registration = ({}: WelcomeScreenProps) => {
  return (
    <MainWrapper>
      <StyledText variant={'h1'}>Registration</StyledText>
    </MainWrapper>
  );
};

export default Registration;
