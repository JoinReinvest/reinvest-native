import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useSimulateFundsWithdrawal } from 'reinvest-app-common/src/services/queries/simulateFundsWithdrawal';

import { getApiClient } from '../../../../../api/getApiClient';
import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Row } from '../../../../../components/Containers/Row';
import { StyledText } from '../../../../../components/typography/StyledText';
import { useCurrentAccount } from '../../../../../hooks/useActiveAccount';
import { WithdrawalFundsFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepRequestWithdrawal: StepParams<WithdrawalFundsFormFields> = {
  identifier: Identifiers.REQUEST_WITHDRAWAL,

  Component: ({ storeFields: { _accountValue }, updateStoreFields, moveToNextStep }: StepComponentProps<WithdrawalFundsFormFields>) => {
    const { activeAccount } = useCurrentAccount();
    const { data, isLoading } = useSimulateFundsWithdrawal(getApiClient, { accountId: activeAccount.id ?? '' });

    const handleContinue = async () => {
      if (!data || isLoading) {
        return;
      }

      const { eligibleForWithdrawal, penaltiesFee } = data;
      await updateStoreFields({
        eligibleForWithdrawal,
        penaltiesFee,
      });
      moveToNextStep();
    };

    return (
      <Box
        fw
        flex={1}
      >
        <Box
          fw
          flex={1}
          style={{ rowGap: 24 }}
        >
          <Box>
            <Row mb="8">
              <StyledText variant="h6">Account Value</StyledText>
            </Row>
            <StyledText variant="dividend">{_accountValue}</StyledText>
          </Box>
          <Box>
            <StyledText variant="paragraphLarge">
              REINVEST users can only request to withdraw funds that are no longer within the (30) day grace period.
            </StyledText>
            <StyledText variant="paragraphLarge">
              You can only withdraw your all eligible funds with REINVEST at once. REINVEST does not permit partial withdrawals of eligible funds.
            </StyledText>
          </Box>
          <StyledText variant="paragraphLarge">Would you like to request fund withdrawal?</StyledText>
        </Box>
        <Box fw>
          <Button
            isLoading={isLoading}
            disabled={!data?.canWithdraw}
            isDestructive
            onPress={handleContinue}
          >
            Request Fund Withdrawal
          </Button>
        </Box>
      </Box>
    );
  },
};
