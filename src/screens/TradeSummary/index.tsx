import { useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useGetInvestmentSummary } from 'reinvest-app-common/src/services/queries/getInvestmentSummary';
import { InvestmentStatus } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { getApiClient } from '../../api/getApiClient';
import { Box } from '../../components/Containers/Box/Box';
import { ScreenHeader } from '../../components/CustomHeader';
import { Loader } from '../../components/Loader';
import { MainWrapper } from '../../components/MainWrapper';
import { StyledText } from '../../components/typography/StyledText';
import { useLogInNavigation } from '../../navigation/hooks';
import { LogInProps, LogInRouteProps } from '../../navigation/LogInNavigator/types';
import Screens from '../../navigation/screens';
import { styles } from './styles';

const Item = ({ title, value, showBorder = true }: { title: string; value: string; showBorder?: boolean }) => {
  return (
    <Box
      fw
      pb="16"
      style={[showBorder && styles.separator]}
    >
      <StyledText
        variant="paragraph"
        color="dark2"
      >
        {title}
      </StyledText>
      <StyledText variant="h6">{value}</StyledText>
    </Box>
  );
};

const STATUS_LABEL: { [key in InvestmentStatus]: string } = {
  [InvestmentStatus.Failed]: 'Failed',
  [InvestmentStatus.Finished]: 'Finished',
  [InvestmentStatus.Funded]: 'Funded',
  [InvestmentStatus.InProgress]: 'In Progress',
  [InvestmentStatus.WaitingForFeesApproval]: 'Waiting For Fees Approval',
  [InvestmentStatus.WaitingForInvestmentStart]: 'Waiting For Investment Start',
  [InvestmentStatus.WaitingForSubscriptionAgreement]: 'Waiting For Subscription Agreement',
};

export const TradeSummary = ({
  route: {
    params: { investmentId },
  },
}: LogInProps<Screens.TradeSummary>) => {
  const { data: summary, isLoading } = useGetInvestmentSummary(getApiClient, { investmentId });
  const navigation = useLogInNavigation();
  const route = useRoute<LogInRouteProps<Screens.TradeSummary>>();

  const getRightHeader = useCallback(
    () => (
      <StyledText
        variant="h6"
        onPress={() => navigation.navigate(Screens.BottomNavigator, { screen: Screens.Dashboard })}
      >
        Cancel
      </StyledText>
    ),
    [navigation],
  );

  if (isLoading || !summary) {
    return (
      <Box
        fw
        flex={1}
        justifyContent="center"
      >
        <Loader size="xxl" />
      </Box>
    );
  }

  const { tradeId, status, createdAt, amount } = summary;

  return (
    <>
      <ScreenHeader
        navigation={navigation}
        route={route}
        options={{
          title: 'Manage Account',
          headerRight: getRightHeader,
        }}
      />
      <MainWrapper style={styles.container}>
        <Box
          fw
          mb="16"
        >
          <Box mb="12">
            <StyledText variant="h5">Trade ID {tradeId}</StyledText>
          </Box>
          <StyledText
            variant="h6"
            color="dark3"
          >
            {STATUS_LABEL[status]}
          </StyledText>
        </Box>
        <Box
          fw
          style={styles.tradeDetailsList}
        >
          <Item
            title="Date"
            value={formatDate(createdAt, 'INVESTMENT', { currentFormat: 'API' })}
          />
          <Item
            title="Amount"
            value={amount.formatted ?? ''}
          />
          <Item
            title="Status"
            value={STATUS_LABEL[status]}
          />
          {/* TODO: Replace bank account when implemented on backend */}
          <Item
            title="Bank Account"
            value="123456123456"
            showBorder={false}
          />
        </Box>
      </MainWrapper>
    </>
  );
};
