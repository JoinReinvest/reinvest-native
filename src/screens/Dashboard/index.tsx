import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box } from '../../components/Containers/Box/Box';
import { MainWrapper } from '../../components/MainWrapper';
import { FormModalDisclaimer } from '../../components/Modals/ModalContent/FormModalDisclaimer';
import { Table } from '../../components/Table';
import { StyledText } from '../../components/typography/StyledText';
import { isStaging } from '../../constants/dev';
import { EQUITY_TABLE_ITEMS, NET_RETURNS_TABLE_ITEMS, TABLE_ITEMS, TableIdentifiers } from '../../constants/tables';
import { LogInProps } from '../../navigation/LogInNavigator/types';
import Screens from '../../navigation/screens';
import { useDialog } from '../../providers/DialogProvider';

export const Dashboard = ({ navigation }: LogInProps<Screens.Dashboard>) => {
  const { top } = useSafeAreaInsets();
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

  const openInfoDialag = (identifier: TableIdentifiers) => {
    const { label, info } = TABLE_ITEMS[identifier];
    openDialog(
      <FormModalDisclaimer
        dark={false}
        headline={label}
        content={info}
      />,
    );
  };

  const mapTableIdentifiersToTableItems = (array: TableIdentifiers[]) =>
    array.map(identifier => ({
      label: TABLE_ITEMS[identifier].label,
      value: getTableItemValue(identifier),
      onPress: () => openInfoDialag(identifier),
    }));

  return (
    <MainWrapper style={{ paddingTop: top }}>
      <StyledText variant="h6">DashBoard</StyledText>
      {!isStaging && (
        <>
          <StyledText
            variant="link"
            onPress={() => navigation.navigate(Screens.Onboarding)}
          >
            Start Onboarding
          </StyledText>
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
        </>
      )}
    </MainWrapper>
  );
};
