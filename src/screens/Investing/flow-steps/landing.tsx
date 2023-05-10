import React, { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useReadBankAccount } from 'reinvest-app-common/src/services/queries/readBankAccount';

import { getApiClient } from '../../../api/getApiClient';
import { Box } from '../../../components/Containers/Box/Box';
import { Loader } from '../../../components/Loader';
import { currentAccount, useAtom } from '../../../store/atoms';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';

export const Landing: StepParams<InvestFormFields> = {
  identifier: Identifiers.LANDING,

  Component: ({ moveToNextStep, updateStoreFields }: StepComponentProps<InvestFormFields>) => {
    const [account] = useAtom(currentAccount);

    const { data, error, isLoading } = useReadBankAccount(getApiClient, { accountId: account.id || '' });

    useEffect(() => {
      if (error) {
        moveToNextStep();
      }

      if (data) {
        (async () => {
          await updateStoreFields({ bankAccount: data });
          moveToNextStep();
        })();
      }
    }, [data, error, moveToNextStep, updateStoreFields]);

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
