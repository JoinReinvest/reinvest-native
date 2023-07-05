import React from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Row } from '../../../../../components/Containers/Row';
import { StyledText } from '../../../../../components/typography/StyledText';
import { UpdateNameFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepOriginalName: StepParams<UpdateNameFormFields> = {
  identifier: Identifiers.ORIGINAL_NAME,

  Component: ({ storeFields: { firstName, lastName }, moveToNextStep }: StepComponentProps<UpdateNameFormFields>) => {
    return (
      <Box
        fw
        flex={1}
        mt="24"
        px="default"
      >
        <Box flex={1}>
          <Row mb="16">
            <StyledText variant="paragraphLarge">Your name</StyledText>
          </Row>
          <StyledText variant="h6">
            {firstName} {lastName}
          </StyledText>
        </Box>
        <Box fw>
          <Button onPress={moveToNextStep}>Update Name</Button>
        </Box>
      </Box>
    );
  },
};
