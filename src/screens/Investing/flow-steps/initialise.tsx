import { useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useReadBankAccount } from 'reinvest-app-common/src/services/queries/readBankAccount';

import { getApiClient } from '../../../api/getApiClient';
import { Box } from '../../../components/Containers/Box/Box';
import { Loader } from '../../../components/Loader';
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

    useEffect(() => {
      if (error) {
        navigate(Screens.BankAccount, { sourceScreen: Screens.Investing, accountId: storeFields.accountId });
      }

      if (data) {
        (async () => {
          await updateStoreFields({ bankAccount: data });
          moveToNextStep();
        })();
      }
    }, [data, error, moveToNextStep, navigate, storeFields.accountId, updateStoreFields]);

    useEffect(() => {
      if (params?.bankAccount) {
        (async () => {
          await updateStoreFields({
            bankAccount: params.bankAccount,
          });
          moveToNextStep();
        })();
      }
    }, [moveToNextStep, params, updateStoreFields]);

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
