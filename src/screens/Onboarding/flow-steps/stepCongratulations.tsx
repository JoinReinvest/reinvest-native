import React, { useEffect } from 'react';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetAccountsOverview } from 'reinvest-app-common/src/services/queries/getAccountsOverview';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { AccountOverview } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { StatusCircle } from '../../../components/StatusCircle';
import { StyledText } from '../../../components/typography/StyledText';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { currentAccount, useAtom } from '../../../store/atoms';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { styles } from './styles';

export const StepCongratulations: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CONGRATULATIONS,

  Component: ({ storeFields }: StepComponentProps<OnboardingFormFields>) => {
    const { replace, reset } = useLogInNavigation();
    const { refetch } = useGetUserProfile(getApiClient);
    const { data: accounts } = useGetAccountsOverview(getApiClient);
    const [account, setAccountAtom] = useAtom(currentAccount);

    useEffect(() => {
      if (!account) {
        (async () => {
          setAccountAtom(accounts?.[0] as AccountOverview);
        })();
      }
    }, [accounts, account, setAccountAtom]);
    const handleContinue = async () => {
      if (storeFields.initialInvestment) {
        reset({ index: 0, routes: [{ name: Screens.Investing, params: { initialInvestment: true } }] });
      } else {
        replace(Screens.Investing, { initialInvestment: false });
      }

      await refetch();
    };

    return (
      <>
        <Box
          px="default"
          flex={1}
          pt="24"
        >
          <StatusCircle
            variant="success"
            justifyContent="flex-start"
          >
            <Box py="8">
              <StyledText
                variant={'h5'}
                color="pureWhite"
              >
                {`Congrats, your profile's live! To fully get set up, time to make that first investment. \n \nLet's go! 💰💸`}
              </StyledText>
            </Box>
          </StatusCircle>
        </Box>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button onPress={handleContinue}>Invest</Button>
        </View>
      </>
    );
  },
};
