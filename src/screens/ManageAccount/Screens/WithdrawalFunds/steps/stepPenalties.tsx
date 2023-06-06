import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Row } from '../../../../../components/Containers/Row';
import { Icon } from '../../../../../components/Icon';
import { FormModalDisclaimer } from '../../../../../components/Modals/ModalContent/FormModalDisclaimer';
import { StyledText } from '../../../../../components/typography/StyledText';
import { useDialog } from '../../../../../providers/DialogProvider';
import { WithdrawalFundsFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { styles } from '../styles';

export const StepPenalties: StepParams<WithdrawalFundsFormFields> = {
  identifier: Identifiers.PENALTIES,

  Component: ({ moveToNextStep }: StepComponentProps<WithdrawalFundsFormFields>) => {
    const { openDialog } = useDialog();

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
            <StyledText variant="dividend">$500.00</StyledText>
          </Box>
          <Box style={{ rowGap: 24 }}>
            <Row
              justifyContent="space-between"
              style={styles.row}
            >
              <StyledText variant="paragraphLarge">$ Eligible Funds for Withdrawal</StyledText>
              <StyledText variant="h6">$500.00</StyledText>
            </Row>
            <Row
              justifyContent="space-between"
              style={styles.row}
            >
              <StyledText variant="paragraphLarge">Penalties for early withdrawal</StyledText>
              <StyledText variant="h6">$50.00</StyledText>
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
            variant="warning"
            onPress={moveToNextStep}
          >
            Request Fund Withdrawal
          </Button>
        </Box>
      </Box>
    );
  },
};
