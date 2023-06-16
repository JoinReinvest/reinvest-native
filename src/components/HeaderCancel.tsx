import React from 'react';

import { StyledText } from './typography/StyledText';

export interface Props {
  dark?: boolean;
  onPress?: () => void;
}

export const HeaderCancel = ({ dark = false, onPress }: Props) => {
  return (
    <StyledText
      color={dark ? 'pureWhite' : 'pureBlack'}
      variant={'h6'}
      onPress={onPress}
    >
      Cancel
    </StyledText>
  );
};
