import { useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetActiveRecurringInvestment } from 'reinvest-app-common/src/services/queries/getActiveRecurringInvestment';
import { useReadBankAccount } from 'reinvest-app-common/src/services/queries/readBankAccount';
import { RecurringInvestmentStatus } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { Box } from '../../../components/Containers/Box/Box';
import { Loader } from '../../../components/Loader';
import { useCurrentAccountConfig } from '../../../hooks/useActiveAccountConfig';
import { useLogInNavigation } from '../../../navigation/hooks';
import { LogInRouteProps } from '../../../navigation/LogInNavigator/types';
import Screens from '../../../navigation/screens';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';

export const Initialise: StepParams<InvestFormFields> = {
  identifier: Identifiers.INITIALISE,
  doesMeetConditionFields: fields => {
    return !!fields.accountId && !fields.bankAccount;
  },

  Component: ({ moveToNextStep, updateStoreFields, storeFields }: StepComponentProps<InvestFormFields>) => {
    const { navigate } = useLogInNavigation();
    const { params } = useRoute<LogInRouteProps<Screens.Investing>>();

    const { data, error, isLoading } = useReadBankAccount(getApiClient, { accountId: storeFields.accountId });
    const { accountConfig } = useCurrentAccountConfig(storeFields.accountId);
    const { data: activeRecurringInvestment, isLoading: getRecurringInvestmentLoading } = useGetActiveRecurringInvestment(getApiClient, {
      accountId: storeFields.accountId,
    });

    useEffect(() => {
      if (error) {
        navigate(Screens.BankAccount, { sourceScreen: Screens.Investing, accountId: storeFields.accountId });
      }

      if (data) {
        (async () => {
          await updateStoreFields({ bankAccount: data, automaticDividendReinvestmentAgreement: accountConfig?.automaticDividendReinvestmentAgreement.signed });
          moveToNextStep();
        })();
      }
    }, [accountConfig?.automaticDividendReinvestmentAgreement.signed, data, error, moveToNextStep, navigate, storeFields.accountId, updateStoreFields]);

    useEffect(() => {
      if (params?.bankAccount) {
        (async () => {
          await updateStoreFields({
            bankAccount: params.bankAccount,
          });
          moveToNextStep();
        })();
      }
    }, [accountConfig?.automaticDividendReinvestmentAgreement.signed, moveToNextStep, params, updateStoreFields]);

    useEffect(() => {
      if (accountConfig) {
        (async () => {
          await updateStoreFields({
            automaticDividendReinvestmentAgreement: accountConfig?.automaticDividendReinvestmentAgreement.signed,
          });
        })();
      }
    }, [accountConfig, updateStoreFields]);

    useEffect(() => {
      if (activeRecurringInvestment) {
        (async () => {
          await updateStoreFields({
            isActiveRecurring: activeRecurringInvestment?.status === RecurringInvestmentStatus.Active,
            _shouldDisplayRecurringInvestment: activeRecurringInvestment?.status !== RecurringInvestmentStatus.Active,
          });
        })();
      }
    }, [accountConfig?.automaticDividendReinvestmentAgreement.signed, activeRecurringInvestment, updateStoreFields]);

    return isLoading ? (
      <Box
        flex={1}
        justifyContent="center"
      >
        <Loader></Loader>
      </Box>
    ) : null;
  },
};
