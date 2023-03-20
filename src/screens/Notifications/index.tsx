import React from 'react';

import {NotificationsScreenProps} from './types';
import {MainWrapper} from '@components/MainWrapper';
import {StyledText} from '@components/typography/StyledText';

export const Notifications = ({}: NotificationsScreenProps) => {
  return (
    <MainWrapper>
      <StyledText variant={'h6'}>Notifications screen</StyledText>
    </MainWrapper>
  );
};
