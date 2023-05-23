import React from 'react';

import { Chart } from '../Chart';
import { Box } from '../Containers/Box/Box';
import { Row } from '../Containers/Row';
import { Icon } from '../Icon';
import { StyledText } from '../typography/StyledText';
import { AccountOverviewProps } from './types';

export const AccountOverview = ({ summaryValue, rateOfReturn }: AccountOverviewProps) => {
  return (
    <Box
      fw
      mb={'24'}
      mt={'24'}
      alignItems={'center'}
    >
      <Row
        fw
        justifyContent={'space-between'}
        alignItems={'flex-end'}
      >
        <Box width={'75%'}>
          <StyledText
            adjustsFontSizeToFit
            numberOfLines={1}
            variant={'h1'}
          >
            {summaryValue}
          </StyledText>
        </Box>
        <Chart compact />
      </Row>
      <Row
        fw
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <StyledText
          variant="paragraphLarge"
          color="dark3"
        >
          Amount value
        </StyledText>
        <Row alignItems={'center'}>
          <Box p="8">
            <Icon
              size={'xs'}
              icon={'circleChevron'}
            />
          </Box>
          <StyledText>{rateOfReturn}</StyledText>
        </Row>
      </Row>
    </Box>
  );
};
