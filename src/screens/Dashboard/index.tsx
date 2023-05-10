import React from 'react';

import { AccountOverview } from '../../components/AccountOverview';
import { Button } from '../../components/Button';
import { Chart } from '../../components/Chart';
import { Box } from '../../components/Containers/Box/Box';
import { MainWrapper } from '../../components/MainWrapper';
import { FormModalDisclaimer } from '../../components/Modals/ModalContent/FormModalDisclaimer';
import { PaddedScrollView } from '../../components/PaddedScrollView';
import { Table } from '../../components/Table';
import { EQUITY_TABLE_ITEMS, NET_RETURNS_TABLE_ITEMS, TABLE_ITEMS, TableIdentifiers } from '../../constants/tables';
import { LogInProps } from '../../navigation/LogInNavigator/types';
import Screens from '../../navigation/screens';
import { useDialog } from '../../providers/DialogProvider';

const mockedChartData = [
  { x: -2, y: 7 },
  { x: -1, y: 15 },

  { x: 2, y: 42 },
  { x: 3, y: 52 },
  { x: 4, y: 61 },
  { x: 5, y: 60 },
  { x: 6, y: 51 },
  { x: 7, y: 70 },

  { x: 10, y: 80 },
];

export const Dashboard = ({ navigation }: LogInProps<Screens.Dashboard>) => {
  const { openDialog } = useDialog();

  const getTableItemValue = (identifier: TableIdentifiers) => {
    // TODO: Replace with values from API:
    switch (identifier) {
      case TableIdentifiers.ADVISORY_FEES:
        return '$123.45';
      case TableIdentifiers.APPRECIATION:
        return '$123.45';
      case TableIdentifiers.COST_OF_SHARES:
        return '$123.45';
      case TableIdentifiers.DIVIDENDS:
        return '$123.45';
      case TableIdentifiers.NAV_PER_SHARE:
        return '$123.45';
      case TableIdentifiers.QUANTITY:
        return '$123.45';
    }
  };

  const openInfoDialog = (identifier: TableIdentifiers) => {
    const { label, info } = TABLE_ITEMS[identifier];
    openDialog(
      <FormModalDisclaimer
        headline={label}
        content={info}
      />,
    );
  };

  const mapTableIdentifiersToTableItems = (array: TableIdentifiers[]) =>
    array.map(identifier => ({
      label: TABLE_ITEMS[identifier].label,
      value: getTableItemValue(identifier),
      onPress: () => openInfoDialog(identifier),
    }));

  return (
    <MainWrapper noPadding>
      <PaddedScrollView>
        <AccountOverview
          summaryValue={'$100,500'}
          chartData={mockedChartData}
          rateOfReturn={'9.75%'}
        />
        <Chart />
        <Box py={'16'}>
          <Button onPress={() => navigation.navigate(Screens.Investing, { initialInvestment: false })}>Invest</Button>
        </Box>
        <Table
          heading="$522.94" // TODO: Replace with values from API:
          subheading="Position Total (Equity)"
          items={mapTableIdentifiersToTableItems(EQUITY_TABLE_ITEMS)}
        />
        <Box mt="8">
          <Table
            heading="$432.56" // TODO: Replace with values from API:
            subheading="Net Returns"
            items={mapTableIdentifiersToTableItems(NET_RETURNS_TABLE_ITEMS)}
          />
        </Box>
      </PaddedScrollView>
    </MainWrapper>
  );
};
