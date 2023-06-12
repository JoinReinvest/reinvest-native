import React from 'react';
import { Usd } from 'reinvest-app-common/src/types/graphql';

import { palette } from '../../../../constants/theme';
import { useDialog } from '../../../../providers/DialogProvider';
import { Button } from '../../../Button';
import { Box } from '../../../Containers/Box/Box';
import { Row } from '../../../Containers/Row';
import { FormDisclaimer } from '../../../FormDisclaimer';
import { Icon } from '../../../Icon';
import { PaddedScrollView } from '../../../PaddedScrollView';
import { StyledText } from '../../../typography/StyledText';

interface Props {
  amount: Usd;
  disclaimer: string;
  headline: string;
  onClose: () => void;
}

export const AmountUpdate = ({ headline, amount, disclaimer, onClose }: Props) => {
  const { closeDialog } = useDialog();

  const returnToDashboard = () => {
    onClose();
    closeDialog();
  };

  return (
    <Box
      flex={1}
      fw
      pt="56"
    >
      <StyledText
        textAlign="center"
        variant="h3"
      >
        {headline}
      </StyledText>
      <PaddedScrollView>
        <Box
          fw
          py="32"
          alignItems="center"
        >
          <StyledText variant="paragraphEmp">Amount</StyledText>
          <Row
            alignItems="center"
            pt="16"
          >
            <Icon
              color={amount.value >= 0 ? palette.success : palette.error}
              icon="down"
              style={{ transform: [{ rotate: amount.value >= 0 ? '180deg' : '0deg' }] }}
            />
            <StyledText
              numberOfLines={1}
              adjustsFontSizeToFit
              variant="h1"
            >
              {amount.formatted}
            </StyledText>
          </Row>
        </Box>
        <FormDisclaimer fw>{disclaimer}</FormDisclaimer>
      </PaddedScrollView>
      <Box
        fw
        pb="24"
        px="default"
      >
        <Button onPress={returnToDashboard}>Dashboard</Button>
      </Box>
    </Box>
  );
};
