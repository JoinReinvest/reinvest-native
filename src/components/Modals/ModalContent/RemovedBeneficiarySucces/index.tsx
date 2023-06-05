import React from 'react';
import { useGetAccountStats } from 'reinvest-app-common/src/services/queries/getAccountStats';

import { getApiClient } from '../../../../api/getApiClient';
import { palette } from '../../../../constants/theme';
import { useDialog } from '../../../../providers/DialogProvider';
import { Button } from '../../../Button';
import { Box } from '../../../Containers/Box/Box';
import { Row } from '../../../Containers/Row';
import { FormDisclaimer } from '../../../FormDisclaimer';
import { Icon } from '../../../Icon';
import { Loader } from '../../../Loader';
import { PaddedScrollView } from '../../../PaddedScrollView';
import { StyledText } from '../../../typography/StyledText';

interface Props {
  beneficiaryAccountValue: string;
  individualAccountId: string;
  onClose: () => void;
}

const parseAmountToNumber = (amount: string): number => +amount.replace('$', '');

export const BeneficiaryRemoveSuccess = ({ individualAccountId, beneficiaryAccountValue, onClose }: Props) => {
  const { closeDialog } = useDialog();
  const { data: stats, isLoading } = useGetAccountStats(getApiClient, { accountId: individualAccountId });

  const total = parseAmountToNumber(beneficiaryAccountValue) + parseAmountToNumber(stats?.accountValue ?? '$0.00');

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
      <PaddedScrollView>
        <StyledText
          textAlign="center"
          variant="h3"
        >
          Beneficiary Account Removed
        </StyledText>
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
              color={palette.success}
              icon="down"
              style={{ transform: [{ rotate: '180deg' }] }}
            />
            {isLoading ? (
              <Loader />
            ) : (
              <StyledText
                numberOfLines={1}
                adjustsFontSizeToFit
                variant="h1"
              >
                {total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </StyledText>
            )}
          </Row>
        </Box>
        <FormDisclaimer fw>Updated Individual Account Value.</FormDisclaimer>
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
