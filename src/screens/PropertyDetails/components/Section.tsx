import React, { PropsWithChildren } from 'react';

import { Box } from '../../../components/Containers/Box/Box';
import { StyledText } from '../../../components/typography/StyledText';

export const Section = ({ children, headline }: PropsWithChildren<{ headline: string }>) => {
  return (
    <Box pt="32">
      <StyledText variant="h5">{headline}</StyledText>
      {children}
    </Box>
  );
};
