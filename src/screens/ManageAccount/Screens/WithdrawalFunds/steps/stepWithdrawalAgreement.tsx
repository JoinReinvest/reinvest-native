import React from 'react';
import { useState } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useRequestFundsWithdrawal } from 'reinvest-app-common/src/services/queries/requestFundsWithdrawal';
import { useSignFundsWithdrawalAgreement } from 'reinvest-app-common/src/services/queries/signFundsWithdrawalAgreement';

import { getApiClient } from '../../../../../api/getApiClient';
import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { DividendReinvestModal } from '../../../../../components/Modals/ModalContent/DividendReinvestModal';
import { HeaderWithLogo } from '../../../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { RadioButton } from '../../../../../components/RadioButton';
import { StyledText } from '../../../../../components/typography/StyledText';
import { useCurrentAccount } from '../../../../../hooks/useActiveAccount';
import { useLogInNavigation } from '../../../../../navigation/hooks';
import { useDialog } from '../../../../../providers/DialogProvider';
import { AgreementDetails } from '../../../../Investing/components/AgreementDocument';
import { WithdrawalFundsFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { styles } from '../styles';

export const StepWithdrawalAgreement: StepParams<WithdrawalFundsFormFields> = {
  identifier: Identifiers.REASON,

  doesMeetConditionFields({ agreement }) {
    return !!agreement;
  },

  Component: ({ storeFields: { agreement, isAgreementAccepted }, updateStoreFields }: StepComponentProps<WithdrawalFundsFormFields>) => {
    const { openDialog } = useDialog();
    const { activeAccount } = useCurrentAccount();
    const { goBack } = useLogInNavigation();
    const [isAccepted, setIsAccepted] = useState(!!isAgreementAccepted);
    const { mutateAsync: signFundsWithdrawalAgreement } = useSignFundsWithdrawalAgreement(getApiClient);
    const { mutateAsync: requestWithdrawal } = useRequestFundsWithdrawal(getApiClient);

    const openAgreement = () => {
      if (agreement) {
        openDialog(<AgreementDetails agreement={agreement} />);
      }
    };

    const onSubmit = async () => {
      const accountId = activeAccount.id ?? '';
      await signFundsWithdrawalAgreement({ accountId });
      const { accountValue } = await requestWithdrawal({ accountId });

      openDialog(
        <DividendReinvestModal
          headline="Funds requested for withdrawal"
          info="Above eligible funds requested to be withdrawn."
          footer="REINVEST will approve or reject this request shortly. Average decision time is under 30 business days."
          amount={accountValue?.formatted as string}
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
            checked={isAccepted}
            onPress={() => setIsAccepted(prev => !prev)}
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
            disabled={!isAccepted}
            onPress={onSubmit}
          >
            Accept
          </Button>
        </Box>
      </Box>
    );
  },
};
