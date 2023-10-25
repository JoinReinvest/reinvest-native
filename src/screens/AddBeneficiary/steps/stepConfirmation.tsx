import React, { useEffect } from 'react';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetAccountsOverview } from 'reinvest-app-common/src/services/queries/getAccountsOverview';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { Icon } from '../../../components/Icon';
import { StatusCircle } from '../../../components/StatusCircle';
import { StyledText } from '../../../components/typography/StyledText';
import { useCurrentAccount } from '../../../hooks/useActiveAccount';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { BeneficiaryCreationFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepConfirmation: StepParams<BeneficiaryCreationFormFields> = {
  identifier: Identifiers.INVESTING_PROMPT,

  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.firstName, fields.lastName];

    return allRequiredFieldsExists(requiredFields);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Component: ({ storeFields }: StepComponentProps<BeneficiaryCreationFormFields>) => {
    const { replace } = useLogInNavigation();
    const { setActiveAccount } = useCurrentAccount();
    const { data: accounts } = useGetAccountsOverview(getApiClient);
    const navigation = useLogInNavigation();

    useEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <Icon
            icon="down"
            style={{ transform: [{ rotate: '90deg' }] }}
            onPress={() => navigation.goBack()}
          />
        ),
        headerRight: undefined,
      });
    }, [navigation]);
    const onSubmit = async () => {
      const beneficiaryAccount = accounts?.find(account => account?.id === storeFields.id);

      if (beneficiaryAccount && beneficiaryAccount.id) {
        await setActiveAccount(beneficiaryAccount);
        replace(Screens.Investing, { accountId: beneficiaryAccount.id });
      }

      // As an option we can parametrize navigation , to get account id in invest flow  (if we will skip setting current account globally)
    };

    return (
      <>
        <Box
          px="default"
          flex={1}
          pt={'24'}
        >
          <StyledText variant="h5">
            Let&apos;s build generational wealth!{'\n'}
            {'\n'}Make your first investment to set up your beneficiary&apos;s account and get started. 💰💪
          </StyledText>
          <StatusCircle
            variant={'success'}
            dark
          />
        </Box>
        <Box
          fw
          px="default"
        >
          <Button onPress={onSubmit}>Invest</Button>
        </Box>
      </>
    );
  },
};
