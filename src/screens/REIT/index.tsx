import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MainWrapper } from '../../components/MainWrapper';
import { StyledText } from '../../components/typography/StyledText';

export const ReitScreen = () => {
  const { top } = useSafeAreaInsets();

  return (
    <MainWrapper style={{ paddingTop: top }}>
      <StyledText variant="h6">Community REIT</StyledText>
    </MainWrapper>
  );
};
