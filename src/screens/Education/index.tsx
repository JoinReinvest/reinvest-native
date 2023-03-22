import React from 'react';

import {EducationScreenProps} from './types';
import {MainWrapper} from '@components/MainWrapper';
import {StyledText} from '@components/typography/StyledText';

export const Education = ({}: EducationScreenProps) => {
  return (
    <MainWrapper>
      <StyledText variant={'h6'}>Education screen</StyledText>
    </MainWrapper>
  );
};
