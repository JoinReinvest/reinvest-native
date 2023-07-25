import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { useGetAccountsOverview } from 'reinvest-app-common/src/services/queries/getAccountsOverview';
import { useGetAccountStats } from 'reinvest-app-common/src/services/queries/getAccountStats';
import { useGetNotifications } from 'reinvest-app-common/src/services/queries/getNotifications';
import { NotificationFilter } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../api/getApiClient';
import { AccountOverview } from '../../components/AccountOverview';
import { Button } from '../../components/Button';
import { Chart } from '../../components/Chart';
import { Box } from '../../components/Containers/Box/Box';
import { MainWrapper } from '../../components/MainWrapper';
import { FormModalDisclaimer } from '../../components/Modals/ModalContent/FormModalDisclaimer';
import { ModalInformation } from '../../components/Modals/ModalContent/Information';
import { PaddedScrollView } from '../../components/PaddedScrollView';
import { Table } from '../../components/Table';
import { EQUITY_TABLE_ITEMS, NET_RETURNS_TABLE_ITEMS, TABLE_ITEMS, TableIdentifiers } from '../../constants/tables';
import { useCurrentAccount } from '../../hooks/useActiveAccount';
import { usePushNotifications } from '../../hooks/usePushNotifications';
import { LogInProps } from '../../navigation/LogInNavigator/types';
import Screens from '../../navigation/screens';
import { useDialog } from '../../providers/DialogProvider';
import { unreadNotificationsCount } from '../../store/atoms';

export const Dashboard = ({ navigation }: LogInProps<Screens.Dashboard>) => {
  const { openDialog } = useDialog();
  const { data: accounts, isLoading } = useGetAccountsOverview(getApiClient);
  const { activeAccount } = useCurrentAccount();
  const { data: stats } = useGetAccountStats(getApiClient, {
    accountId: activeAccount.id ?? '',
    config: { enabled: !!activeAccount.id },
  });
  const { data: notifications } = useGetNotifications(getApiClient, {
    accountId: activeAccount.id ?? '',
    filter: NotificationFilter.Unread,
    config: { enabled: !!activeAccount.id },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setUnreadNotificationsCount] = useAtom(unreadNotificationsCount);
  usePushNotifications();

  const getTableItemValue = (identifier: TableIdentifiers) => {
    if (!stats) return '';

    switch (identifier) {
      case TableIdentifiers.ADVISORY_FEES:
        return stats.advisorFees;
      case TableIdentifiers.APPRECIATION:
        return stats.appreciation;
      case TableIdentifiers.COST_OF_SHARES:
        return stats.costOfSharesOwned;
      case TableIdentifiers.DIVIDENDS:
        return stats.dividends;
      case TableIdentifiers.NAV_PER_SHARE:
        return stats.currentNAVPerShare;
      case TableIdentifiers.QUANTITY:
        return stats.quantityOfShares;
    }
  };

  const openInfoDialog = (identifier: TableIdentifiers) => {
    const { label, info } = TABLE_ITEMS[identifier];

    openDialog(
      <ModalInformation
        heading={label}
        content={info}
      />,
      {
        closeIcon: false,
        animationType: 'fade',
      },
      'sheet',
    );
  };

  const mapTableIdentifiersToTableItems = (array: TableIdentifiers[]) =>
    array.map(identifier => ({
      label: TABLE_ITEMS[identifier].label,
      value: getTableItemValue(identifier),
      onPress: () => openInfoDialog(identifier),
    }));

  const handleInvest = () => {
    if (accounts?.length && accounts.length > 1) {
      return navigation.navigate(Screens.InvestingAccountSelection);
    }

    return navigation.navigate(Screens.Investing, {});
  };

  useEffect(() => {
    if (notifications) {
      setUnreadNotificationsCount(notifications.pages[0]?.unreadCount ?? 0);
    }
  }, [notifications, setUnreadNotificationsCount]);

  return (
    <MainWrapper noPadding>
      <PaddedScrollView>
        <AccountOverview summaryValue={stats?.accountValue ?? ''} />
        <Chart />
        <Box py={'16'}>
          <Button
            disabled={isLoading}
            onPress={handleInvest}
          >
            Invest
          </Button>
        </Box>
        <Table
          heading={stats?.EVS ?? ''}
          subheading="Position Total (Equity)"
          items={mapTableIdentifiersToTableItems(EQUITY_TABLE_ITEMS)}
        />
        <Box mt="8">
          <Table
            heading={stats?.netReturns ?? ''}
            subheading="Net Returns"
            items={mapTableIdentifiersToTableItems(NET_RETURNS_TABLE_ITEMS)}
          />
        </Box>
      </PaddedScrollView>
    </MainWrapper>
  );
};
