import { useState } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { SubscriptionAgreement, SubscriptionAgreementStatus, SubscriptionAgreementType } from 'reinvest-app-common/src/types/graphql';

import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { DividendReinvestModal } from '../../../../../components/Modals/ModalContent/DividendReinvestModal';
import { HeaderWithLogo } from '../../../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { RadioButton } from '../../../../../components/RadioButton';
import { StyledText } from '../../../../../components/typography/StyledText';
import { useLogInNavigation } from '../../../../../navigation/hooks';
import { useDialog } from '../../../../../providers/DialogProvider';
import { AgreementDetails } from '../../../../Investing/ components/AgreementDocument';
import { WithdrawalFundsFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { styles } from '../styles';

export const StepWithdrawalAgreement: StepParams<WithdrawalFundsFormFields> = {
  identifier: Identifiers.REASON,

  Component: ({ storeFields, updateStoreFields }: StepComponentProps<WithdrawalFundsFormFields>) => {
    const { openDialog } = useDialog();
    const { goBack } = useLogInNavigation();
    const [isAgreementAccepted, setIsAgreementAccepted] = useState(!!storeFields.isAgreementAccepted);

    const openAgreement = () => openDialog(<AgreementDetails agreement={agreementMock} />);

    const openSuccessDialog = async () => {
      openDialog(
        <DividendReinvestModal
          headline="Funds requested for withdrawal"
          info="Above eligible funds requested to be withdrawn."
          footer="REINVEST will approve or reject this request shortly. Average decision time is under 30 business days."
          amount={storeFields._accountValue}
        />,
        {
          showLogo: true,
          header: <HeaderWithLogo onClose={goBack} />,
        },
      );
      await updateStoreFields({ isAgreementAccepted });
    };

    return (
      <Box
        fw
        flex={1}
      >
        <StyledText variant="h5">Why are you requesting to withdraw funds?</StyledText>
        <Box
          fw
          flex={1}
          mt="24"
        >
          <RadioButton
            radioStyles={styles.agreementsRadioStyles}
            value={'recurringAgreement'}
            checked={isAgreementAccepted}
            onPress={() => setIsAgreementAccepted(prev => !prev)}
          >
            <StyledText
              variant="link"
              onPress={openAgreement}
            >
              Withdrawal request Agreement
            </StyledText>
          </RadioButton>
        </Box>
        <Box fw>
          <Button
            disabled={!isAgreementAccepted}
            onPress={openSuccessDialog}
          >
            Accept
          </Button>
        </Box>
      </Box>
    );
  },
};

const agreementMock: SubscriptionAgreement = {
  content: [
    {
      header: 'Withdrawal request Agreement',
      paragraphs: [
        {
          lines: [
            'As a condition to exercising the rights to the Licensed Program. The Recipient may select either this Agreement and does not already Covered Code as defined in the absence of any other entity based on the Program, and can be in a reasonable attempt to trace the Current Maintainer under Clause 2 above, as long as you Externally Deploy Your Modifications, or publicly available. Source Code of the Derived Program; and (b) the object code is released under Section 2(b) shall terminate if it has sufficient copyright rights in the most ordinary way, to print an announcement.) These requirements apply to the Derived Program to replace the Derived Program.',
          ],
        },
        {
          lines: [
            'Article 3 (Restriction) The license agreements (excluding licenses to distributors and reselle rs) that have been met for that Covered Code could lead to death, personal injury, or severe physical or environmental damage. LIMITATION OF LIABILITY. TO THE EXTENT NOT PROHIBITED BY LAW, NO COPYRIGHT HOLDER OR CONTRIBUTOR WILL BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES (INCLUDING WITHOUT LIMITATION LOST PROFITS), HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHER DEALINGS IN THE COVERED CODE, OR ANY DISTRIBUTOR OF LICENSED PRODUCT, OR ANY OTHER USERS OF THE POSSIBILITY OF SUCH DAMAGES.',
          ],
        },
        {
          lines: [
            'GENERAL If any provision of this Package without restriction, including without limitation, method, process, and apparatus claims, in any medium without restriction, provided that each external component clearly identifies itself as the Recipient shall have no further obligations under this Agreement are reserved. This Agreement is published, Contributor may elect to distribute the Program with other software or devices. Contributor Grant. Subject to the absence of any character arising as a component of an unequivocal list it might be impossible for You to the author/donor to decide if he or she is willing to receive error reports for the Work.',
          ],
        },
      ],
    },
  ],
  createdAt: new Date(),
  id: '0',
  status: SubscriptionAgreementStatus.WaitingForSignature,
  type: SubscriptionAgreementType.DirectDeposit,
};
