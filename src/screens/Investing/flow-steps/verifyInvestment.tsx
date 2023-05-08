import React, { useCallback, useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { Loader } from '../../../components/Loader';
import { MainWrapper } from '../../../components/MainWrapper';
import { InvestSuccess } from '../../../components/Modals/ModalContent/InvestmentSuccess';
import { HeaderWithLogo } from '../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { StyledText } from '../../../components/typography/StyledText';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { useDialog } from '../../../providers/DialogProvider';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';

export const VerifyInvestment: StepParams<InvestFormFields> = {
  identifier: Identifiers.VERIFY_INVESTMENT,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Component: ({ moveToNextStep }: StepComponentProps<InvestFormFields>) => {
    const { openDialog } = useDialog();
    const { navigate } = useLogInNavigation();

    const showSuccessDialog = useCallback(() => {
      openDialog(<InvestSuccess />, {
        showLogo: true,
        header: <HeaderWithLogo onClose={() => navigate(Screens.Dashboard)} />,
        closeIcon: false,
      });
    }, [navigate, openDialog]);

    useEffect(() => {
      setTimeout(() => {
        showSuccessDialog();
      }, 3000);
    }, [showSuccessDialog]);

    return (
      <MainWrapper>
        <Loader size={'xxl'} />
        <StyledText>We are verifying your investment.</StyledText>
      </MainWrapper>
    );
  },
};
