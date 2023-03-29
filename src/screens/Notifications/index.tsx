import React from 'react';

import { MainWrapper } from '../../components/MainWrapper';
import { StyledText } from '../../components/typography/StyledText';
import { NotificationsScreenProps } from './types';

export const Notifications = ({}: NotificationsScreenProps) => {
  return (
    <MainWrapper>
      <StyledText variant={'h6'}>Notifications screen</StyledText>
    </MainWrapper>
  );
};
