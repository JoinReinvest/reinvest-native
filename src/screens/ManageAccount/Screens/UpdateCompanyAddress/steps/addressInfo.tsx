import React from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetCorporateAccount } from 'reinvest-app-common/src/services/queries/getCorporateAccount';
import { useGetTrustAccount } from 'reinvest-app-common/src/services/queries/getTrustAccount';
import { AccountType } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../../../api/getApiClient';
import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Loader } from '../../../../../components/Loader';
import { StyledText } from '../../../../../components/typography/StyledText';
import { useCurrentAccount } from '../../../../../hooks/useActiveAccount';
import { AddressFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const AddressInfo: StepParams<AddressFields> = {
  identifier: Identifiers.ADDRESS_INFO,

  Component: ({ moveToNextStep }: StepComponentProps<AddressFields>) => {
    const { activeAccount } = useCurrentAccount();
    const {
      data: corporateAccount,
      isLoading: isLoadingCorporateAccount,
      isRefetching: isRefetchingCorporateAccount,
    } = useGetCorporateAccount(getApiClient, {
      accountId: activeAccount.id ?? '',
      config: {
        enabled: !!activeAccount?.id && activeAccount.type === AccountType.Corporate,
      },
    });
    const {
      data: trustAccount,
      isLoading: isLoadingTrustAccount,
      isRefetching: isRefetchingTrustAccount,
    } = useGetTrustAccount(getApiClient, {
      accountId: activeAccount.id ?? '',
      config: {
        enabled: !!activeAccount?.id && activeAccount.type === AccountType.Trust,
      },
    });

    const isLoading =
      activeAccount.type === AccountType.Corporate
        ? isLoadingCorporateAccount || isRefetchingCorporateAccount
        : isLoadingTrustAccount || isRefetchingTrustAccount;
    const data = corporateAccount ?? trustAccount;
    const address = data?.details?.address;

    return (
      <Box
        fw
        flex={1}
        px={'default'}
      >
        <Box
          fw
          flex={1}
          pt="8"
        >
          <StyledText variant="paragraph">Your current address:</StyledText>
          {isLoading && <Loader />}
          {address && (
            <Box mt="16">
              <StyledText variant="paragraphEmp">{`${address.addressLine1}\n${address.addressLine2}\n${address.city}, ${address.state}\n${address.zip}`}</StyledText>
            </Box>
          )}
        </Box>
        <Box fw>
          <Button onPress={moveToNextStep}>Update Company Address</Button>
        </Box>
      </Box>
    );
  },
};
