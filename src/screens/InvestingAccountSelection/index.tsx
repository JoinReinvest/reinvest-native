import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useGetAccountsOverview } from 'reinvest-app-common/src/services/queries/getAccountsOverview';

import { getApiClient } from '../../api/getApiClient';
import { AccountSummaryProps } from '../../components/AccountSummary';
import { Button } from '../../components/Button';
import { Box } from '../../components/Containers/Box/Box';
import { MainWrapper } from '../../components/MainWrapper';
import { SwitchAccountsList } from '../../components/SwtichAccounts';
import { StyledText } from '../../components/typography/StyledText';
import { useCurrentAccountConfig } from '../../hooks/useActiveAccountConfig';
import { useLogInNavigation } from '../../navigation/hooks';
import Screens from '../../navigation/screens';
import { styles } from '../Investing/flow-steps/styles';

export const InvestingAccountSelection = () => {
  const { connectedAccountId } = useCurrentAccountConfig();

  const { data: accounts } = useGetAccountsOverview(getApiClient);

  const [selected, setSelected] = useState(connectedAccountId || '');

  const { navigate } = useLogInNavigation();

  const onSubmit = async () => {
    navigate(Screens.Investing, { initialInvestment: false, accountId: selected });
  };

  return (
    <MainWrapper
      noPadding
      bottomSafe
    >
      <>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewPaddingTop}
        >
          <Box
            pt="24"
            pb="16"
            px="default"
          >
            <StyledText variant="h5">Choose which account you want to invest in </StyledText>
          </Box>
          {!!accounts?.length && (
            <SwitchAccountsList
              value={selected}
              onSelect={setSelected}
              accounts={accounts as AccountSummaryProps[]}
            />
          )}
        </ScrollView>
        <Box flex={1}></Box>
        <View
          key="buttons_section"
          style={[styles.buttonsSection]}
        >
          <Button onPress={onSubmit}>Continue</Button>
        </View>
      </>
    </MainWrapper>
  );
};
