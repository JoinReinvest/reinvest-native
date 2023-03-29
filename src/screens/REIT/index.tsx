import React from 'react';

import { MainWrapper } from '../../components/MainWrapper';
import { StyledText } from '../../components/typography/StyledText';
import { REITScreenProps } from './types';

export const ReitScreen = ({}: REITScreenProps) => {
  return (
    <MainWrapper>
      <StyledText variant={'h6'}>Community REIT</StyledText>
    </MainWrapper>
  );
};
