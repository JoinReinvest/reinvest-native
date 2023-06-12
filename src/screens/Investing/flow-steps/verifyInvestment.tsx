import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { RECURRING_INVESTMENT_INTERVAL_LABELS } from 'reinvest-app-common/src/constants/recurring-investment-intervals';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetAccountsOverview } from 'reinvest-app-common/src/services/queries/getAccountsOverview';
import { useGetInvestmentSummary } from 'reinvest-app-common/src/services/queries/getInvestmentSummary';
import { useInitiateRecurringInvestment } from 'reinvest-app-common/src/services/queries/initiateRecurringInvestment';
import { useStartInvestment } from 'reinvest-app-common/src/services/queries/startInvestment';
import { useVerifyAccount } from 'reinvest-app-common/src/services/queries/verifyAccount';
import { VerificationAction } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { queryClient } from '../../../App';
import { Loader } from '../../../components/Loader';
import { MainWrapper } from '../../../components/MainWrapper';
import { DialogItem, InvestSuccess } from '../../../components/Modals/ModalContent/InvestmentSuccess';
import { HeaderWithLogo } from '../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { StyledText } from '../../../components/typography/StyledText';
import { InvestingDialogDisclaimers } from '../../../constants/strings';
import { useCurrentAccount } from '../../../hooks/useActiveAccount';
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
    storeFields: { accountId, oneTimeInvestmentId, investAmount, recurringInvestment, recurringInvestmentId, initialInvestment },
  }: StepComponentProps<InvestFormFields>) => {
    const { openDialog } = useDialog();
    const {
      params: { validationSuccess },
    } = useRoute<LogInRouteProps<Screens.Investing>>();

    const { setActiveAccount, activeAccount } = useCurrentAccount();
    const { data: accounts } = useGetAccountsOverview(getApiClient);
    const { navigate, reset, pop } = useLogInNavigation();
    const { mutateAsync: validateAccount } = useVerifyAccount(getApiClient);
    const { mutateAsync: startInvestment } = useStartInvestment(getApiClient);
    const { mutateAsync: startRecurring } = useInitiateRecurringInvestment(getApiClient);
    const { data: investmentSummary, isLoading: isLoadingInvestmentSummary } = useGetInvestmentSummary(getApiClient, {
      investmentId: oneTimeInvestmentId ?? '',
      config: {
        enabled: !!oneTimeInvestmentId,
      },
    });
    const isAlreadyStarted = useRef(false);

    const showSuccessDialog = useCallback(() => {
      const investments: DialogItem[] = [];

      if (oneTimeInvestmentId && !!investAmount) {
        investments.push({ amount: investAmount, date: dayjs().format('YYYY-MM-DD'), headline: `One Time investment` });
      }

      if (recurringInvestmentId && recurringInvestment && recurringInvestment.interval) {
        investments.push({
          amount: recurringInvestment.recurringAmount || 0,
          date: recurringInvestment.startingDate || '',
          headline: `Recurring ${RECURRING_INVESTMENT_INTERVAL_LABELS.get(recurringInvestment.interval)} investment`,
          isRecurring: true,
        });
      }

      const setCurrentAccountAfterSuccess = () => {
        if (activeAccount.id !== accountId) {
          const account = accounts?.find(account => account?.id === accountId);

          if (account) {
            setActiveAccount(account);
          }
        }

        if (initialInvestment) {
          /*
            moving this to event loop we are sure that painting of dashboard is ended.
            Unknown race condition with repainting next screen sometimes occurs causing app crash
           */

          setTimeout(() => {
            reset({ index: 0, routes: [{ name: Screens.BottomNavigator }] });
          }, 0);
        } else {
          pop(accounts && accounts?.length > 1 ? 2 : 1);
        }
      };

      openDialog(
        <InvestSuccess
          onProceed={setCurrentAccountAfterSuccess}
          type="invest"
          dialogItems={investments}
          buttonLabel="Dashboard"
          disclaimer={InvestingDialogDisclaimers.invest}
        />,
        {
          showLogo: true,
          header: (
            <HeaderWithLogo
              onClose={() => {
                setCurrentAccountAfterSuccess();
              }}
            />
          ),
          closeIcon: false,
        },
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, openDialog, accounts]);

    const startInvestmentHandler = useCallback(async () => {
      if (oneTimeInvestmentId) {
        await startInvestment({ investmentId: oneTimeInvestmentId, approveFees: true });
      }

      if (recurringInvestmentId) {
        await startRecurring({ accountId });
      }

      showSuccessDialog();
      queryClient.invalidateQueries(['getAccountStats']);
    }, [accountId, oneTimeInvestmentId, recurringInvestmentId, showSuccessDialog, startInvestment, startRecurring]);

    const validateAndStart = async () => {
      const response = await validateAccount({ accountId });

      const feesValue = investmentSummary?.investmentFees?.value ?? 0;

      if (oneTimeInvestmentId || recurringInvestmentId) {
        if (response?.canUserContinueTheInvestment && !feesValue) {
          await startInvestmentHandler();
        } else if (response?.requiredActions || feesValue > 0) {
          navigate(Screens.KYCFail, {
            actions: (response?.requiredActions ?? []) as VerificationAction[],
            oneTimeInvestmentId,
            recurringInvestmentId,
            fees: investmentSummary?.investmentFees ?? undefined,
          });
        }
      }
    };

    useLayoutEffect(() => {
      if ((!isLoadingInvestmentSummary && !validationSuccess && !isAlreadyStarted.current) || !oneTimeInvestmentId) {
        validateAndStart();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingInvestmentSummary, validationSuccess, oneTimeInvestmentId]);

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
