import React from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { Domicile, DomicileType } from 'reinvest-app-common/src/types/graphql';

import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Row } from '../../../../../components/Containers/Row';
import { PaddedScrollView } from '../../../../../components/PaddedScrollView';
import { StyledText } from '../../../../../components/typography/StyledText';
import { UpdateDomicileFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

const DOMICILE_KEY_LABELS: { [key in keyof Domicile]: string } = {
  type: 'Your Domicile',
  visaType: 'Visa Type',
  birthCountry: 'Birth Country',
  citizenshipCountry: 'Citizenship Country',
};

const DOMICILE_TYPE_LABELS: { [key in DomicileType]: string } = {
  [DomicileType.Citizen]: 'US Citizen',
  [DomicileType.Visa]: 'Visa',
  [DomicileType.GreenCard]: 'Green Card',
};

export const StepOriginalDomicile: StepParams<UpdateDomicileFormFields> = {
  identifier: Identifiers.ORIGINAL_DOMICILE,

  Component: ({ storeFields, moveToNextStep }: StepComponentProps<UpdateDomicileFormFields>) => {
    return (
      <Box
        fw
        flex={1}
        mt="24"
      >
        <PaddedScrollView>
          <Box flexDirection="column">
            {Object.entries(storeFields).map(([key, value]) =>
              value ? (
                <Box
                  key={key}
                  mb="16"
                >
                  <Row>
                    <StyledText variant="paragraphLarge">{DOMICILE_KEY_LABELS[key as keyof Domicile]}</StyledText>
                  </Row>
                  <Row>{value && <StyledText variant="paragraphEmp">{key === 'type' ? DOMICILE_TYPE_LABELS[value as DomicileType] : value}</StyledText>}</Row>
                </Box>
              ) : null,
            )}
          </Box>
        </PaddedScrollView>
        <Box
          fw
          px="default"
        >
          <Button onPress={moveToNextStep}>Update Domicile</Button>
        </Box>
      </Box>
    );
  },
};
