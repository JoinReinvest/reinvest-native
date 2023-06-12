import React, { PropsWithChildren } from 'react';
import Animated, { CurvedTransition } from 'react-native-reanimated';

import { Box } from '../../../components/Containers/Box/Box';
import { StyledText } from '../../../components/typography/StyledText';

export const Section = ({ children, headline }: PropsWithChildren<{ headline: string }>) => {
  return (
    <Animated.View layout={CurvedTransition.duration(200)}>
      <Box pt="32">
        <StyledText variant="h5">{headline}</StyledText>
        {children}
      </Box>
    </Animated.View>
  );
};
