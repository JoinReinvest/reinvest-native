import React from 'react';

import {WelcomeScreenProps} from './SignIn.types';
import MainWrapper from '@components/MainWrapper/MainWrapper';
import StyledText from '@components/typography/StyledText/StyledText';

const SignIn = ({}: WelcomeScreenProps) => {
  return (
    <MainWrapper>
      <StyledText variant={'h1'}>SignIn</StyledText>
    </MainWrapper>
  );
};

export default SignIn;
