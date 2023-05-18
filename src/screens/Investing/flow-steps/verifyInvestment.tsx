import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useInitiateRecurringInvestment } from 'reinvest-app-common/src/services/queries/initiateRecurringInvestment';
import { useStartInvestment } from 'reinvest-app-common/src/services/queries/startInvestment';
import { useVerifyAccount } from 'reinvest-app-common/src/services/queries/verifyAccount';
import { VerificationAction } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { Loader } from '../../../components/Loader';
import { MainWrapper } from '../../../components/MainWrapper';
import { DialogInvestment, InvestSuccess } from '../../../components/Modals/ModalContent/InvestmentSuccess';
import { HeaderWithLogo } from '../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { StyledText } from '../../../components/typography/StyledText';
import { InvestingDialogDisclaimers } from '../../../constants/strings';
import { useLogInNavigation } from '../../../navigation/hooks';
import { LogInRouteProps } from '../../../navigation/LogInNavigator/types';
import Screens from '../../../navigation/screens';
import { useDialog } from '../../../providers/DialogProvider';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';

export const VerifyInvestment: StepParams<InvestFormFields> = {
  identifier: Identifiers.VERIFY_INVESTMENT,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Component: ({
    storeFields: { accountId, oneTimeInvestmentId, investAmount, recurringInvestment, recurringInvestmentId },
  }: StepComponentProps<InvestFormFields>) => {
    const { openDialog } = useDialog();
    const {
      params: { validationSuccess },
    } = useRoute<LogInRouteProps<Screens.Investing>>();

    const { navigate } = useLogInNavigation();
    const { mutateAsync } = useVerifyAccount(getApiClient);
    const { mutateAsync: startInvestment } = useStartInvestment(getApiClient);
    const { mutateAsync: startRecurring } = useInitiateRecurringInvestment(getApiClient);
    const isAlreadyStarted = useRef(false);

    const showSuccessDialog = useCallback(() => {
      const investments: DialogInvestment[] = [];

      if (oneTimeInvestmentId && !!investAmount) {
        investments.push({ amount: investAmount, date: dayjs().format('YYYY-MM-DD'), headline: `One Time investment` });
      }

      if (recurringInvestmentId && recurringInvestment) {
        investments.push({
          amount: recurringInvestment.recurringAmount || '',
          date: recurringInvestment.startingDate || '',
          headline: `Recurring ${recurringInvestment.interval} investment`,
          isRecurring: true,
        });
      }

      openDialog(
        <InvestSuccess
          type="invest"
          investments={investments}
          disclaimer={InvestingDialogDisclaimers.invest}
        />,
        {
          showLogo: true,
          header: <HeaderWithLogo onClose={() => navigate(Screens.Dashboard)} />,
          closeIcon: false,
        },
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, openDialog]);

    const startInvestmentHandler = useCallback(async () => {
      if (oneTimeInvestmentId) {
        await startInvestment({ investmentId: oneTimeInvestmentId, approveFees: true });
      }

      if (recurringInvestmentId) {
        await startRecurring({ accountId });
      }

      showSuccessDialog();
    }, [accountId, oneTimeInvestmentId, recurringInvestmentId, showSuccessDialog, startInvestment, startRecurring]);

    const validateAndStart = async () => {
      const response = await mutateAsync({ accountId });

      if (oneTimeInvestmentId) {
        if (response?.canUserContinueTheInvestment) {
          await startInvestmentHandler();
        } else if (response?.requiredActions) {
          navigate(Screens.KYCFail, { actions: response.requiredActions as VerificationAction[] });
        }
      }
    };

    useLayoutEffect(() => {
      validateAndStart();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      /*
      To avoid running while re-rendering during showing dialog
       */
      if (validationSuccess && !isAlreadyStarted.current) {
        startInvestmentHandler();
        isAlreadyStarted.current = true;
      }
    }, [startInvestmentHandler, validationSuccess]);

    return (
      <MainWrapper>
        <Loader size={'xxl'} />
        <StyledText>We are verifying your investment.</StyledText>
      </MainWrapper>
    );
  },
};
