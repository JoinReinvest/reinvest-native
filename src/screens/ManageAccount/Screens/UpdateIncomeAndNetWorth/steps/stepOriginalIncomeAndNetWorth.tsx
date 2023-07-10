import React from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Row } from '../../../../../components/Containers/Row';
import { StyledText } from '../../../../../components/typography/StyledText';
import { UpdateIncomeAndNetWorthFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepOriginalIncomeAndNetWorth: StepParams<UpdateIncomeAndNetWorthFormFields> = {
  identifier: Identifiers.ORIGINAL_INCOME_AND_NET_WORTH,

  Component: ({ storeFields: { originalNetIncome, originalNetWorth }, moveToNextStep }: StepComponentProps<UpdateIncomeAndNetWorthFormFields>) => {
    return (
      <Box
        fw
        flex={1}
        mt="24"
        px="default"
      >
        <Box flex={1}>
          <Row mb="16">
            <StyledText>Your net worth range</StyledText>
          </Row>
          <StyledText variant="h6">{originalNetWorth}</StyledText>
          <Row my="16">
            <StyledText>Your net income range</StyledText>
          </Row>
          <StyledText variant="h6">{originalNetIncome}</StyledText>
        </Box>
        <Box fw>
          <Button onPress={moveToNextStep}>Update Income and Net Worth</Button>
        </Box>
      </Box>
    );
  },
};
