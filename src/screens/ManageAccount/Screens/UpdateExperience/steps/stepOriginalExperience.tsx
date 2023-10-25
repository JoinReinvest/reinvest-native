import React from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Row } from '../../../../../components/Containers/Row';
import { StyledText } from '../../../../../components/typography/StyledText';
import { UpdateExperienceFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { EXPERIENCE_LABELS } from '../utils';

export const StepOriginalExperience: StepParams<UpdateExperienceFormFields> = {
  identifier: Identifiers.ORIGINAL_EXPERIENCE,

  Component: ({ storeFields: { originalExperience }, moveToNextStep }: StepComponentProps<UpdateExperienceFormFields>) => {
    return (
      <Box
        fw
        flex={1}
        mt="24"
        px="default"
      >
        <Box flex={1}>
          <Row mb="16">
            <StyledText>Your Experience</StyledText>
          </Row>
          {originalExperience && <StyledText variant="h6">{EXPERIENCE_LABELS[originalExperience]}</StyledText>}
        </Box>
        <Box fw>
          <Button onPress={moveToNextStep}>Update Experience</Button>
        </Box>
      </Box>
    );
  },
};
