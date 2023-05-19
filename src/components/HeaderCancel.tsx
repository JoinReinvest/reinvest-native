import React from 'react';

import { StyledText } from './typography/StyledText';

export interface Props {
  onPress?: () => void;
}

export const HeaderCancel = ({ onPress }: Props) => {
  return (
    <StyledText
      variant={'h6'}
      onPress={onPress}
    >
      Cancel
    </StyledText>
  );
};
