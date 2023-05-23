import React from 'react';

import { Chart } from '../Chart';
import { Box } from '../Containers/Box/Box';
import { Row } from '../Containers/Row';
import { StyledText } from '../typography/StyledText';
import { AccountOverviewProps } from './types';

export const AccountOverview = ({ summaryValue }: AccountOverviewProps) => {
  return (
    <Box
      fw
      mb={'24'}
      mt={'24'}
      flexDirection="row"
      justifyContent="space-between"
    >
      <Box style={{ rowGap: 8 }}>
        <StyledText
          adjustsFontSizeToFit
          numberOfLines={1}
          variant="dividend"
        >
          {summaryValue}
        </StyledText>
        <StyledText
          variant="paragraphLarge"
          color="dark3"
        >
          Amount value
        </StyledText>
      </Box>
      <Row alignItems="flex-end">
        <Chart compact />
      </Row>
    </Box>
  );
};
