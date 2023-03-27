import { MainWrapper } from '@components/MainWrapper';
import { StyledText } from '@components/typography/StyledText';
import React from 'react';

import { EducationScreenProps } from './types';

export const Education = ({}: EducationScreenProps) => {
  return (
    <MainWrapper>
      <StyledText variant={'h6'}>Education screen</StyledText>
    </MainWrapper>
  );
};
