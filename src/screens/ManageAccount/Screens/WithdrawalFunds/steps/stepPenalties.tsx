import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateFundsWithdrawalRequest } from 'reinvest-app-common/src/services/queries/createFundsWithdrawalRequest';

import { getApiClient } from '../../../../../api/getApiClient';
import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Row } from '../../../../../components/Containers/Row';
import { Icon } from '../../../../../components/Icon';
import { FormModalDisclaimer } from '../../../../../components/Modals/ModalContent/FormModalDisclaimer';
import { StyledText } from '../../../../../components/typography/StyledText';
import { useCurrentAccount } from '../../../../../hooks/useActiveAccount';
import { useDialog } from '../../../../../providers/DialogProvider';
import { WithdrawalFundsFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { styles } from '../styles';

export const StepPenalties: StepParams<WithdrawalFundsFormFields> = {
  identifier: Identifiers.PENALTIES,

  Component: ({ storeFields: { _accountValue, eligibleForWithdrawal, penaltiesFee }, moveToNextStep }: StepComponentProps<WithdrawalFundsFormFields>) => {
    const { openDialog } = useDialog();
    const { activeAccount } = useCurrentAccount();
    const { mutateAsync: createFundsWithdrawalRequest } = useCreateFundsWithdrawalRequest(getApiClient);

    const handleContinue = async () => {
      const accountId = activeAccount.id ?? '';
      await createFundsWithdrawalRequest({ accountId });

      moveToNextStep();
    };

    const openEligibleFundsDialog = () =>
      openDialog(
        <FormModalDisclaimer
          headline={'What are eligible funds?'}
          content="content"
        />,
      );

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
          <Box style={{ rowGap: 24 }}>
            <Row
              justifyContent="space-between"
              style={styles.row}
            >
              <StyledText variant="paragraphLarge">$ Eligible Funds for Withdrawal</StyledText>
              <StyledText variant="h6">{eligibleForWithdrawal?.formatted}</StyledText>
            </Row>
            <Row
              justifyContent="space-between"
              style={styles.row}
            >
              <StyledText variant="paragraphLarge">Penalties for early withdrawal</StyledText>
              <StyledText variant="h6">{penaltiesFee?.formatted}</StyledText>
            </Row>
            <Row alignItems="center">
              <Icon
                icon="info"
                size="s"
              />
              <StyledText
                variant="link"
                onPress={openEligibleFundsDialog}
              >
                What are eligible funds?
              </StyledText>
            </Row>
          </Box>
        </Box>
        <Box fw>
          <Button
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
