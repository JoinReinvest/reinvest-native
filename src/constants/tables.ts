export enum TableIdentifiers {
  COST_OF_SHARES = 'COST_OF_SHARES',
  QUANTITY = 'QUANTITY',
  NAV_PER_SHARE = 'NAV_PER_SHARE',
  DIVIDENDS = 'DIVIDENDS',
  APPRECIATION = 'APPRECIATION',
  ADVISORY_FEES = 'ADVISORY_FEES',
}

export const TABLE_ITEMS: { [key in TableIdentifiers]: { info: string; label: string } } = {
  COST_OF_SHARES: { label: 'Cost of Shares Owned', info: 'Lorem Ipsum' },
  QUANTITY: { label: 'Quantity', info: 'Lorem Ipsum' },
  NAV_PER_SHARE: { label: 'Current NAV Per Share', info: 'Lorem Ipsum' },
  DIVIDENDS: { label: 'Dividends', info: 'Lorem Ipsum' },
  APPRECIATION: { label: 'Appreciation', info: 'Lorem Ipsum' },
  ADVISORY_FEES: { label: 'Advisory Fees', info: 'Lorem Ipsum' },
};

export const EQUITY_TABLE_ITEMS = [TableIdentifiers.COST_OF_SHARES, TableIdentifiers.QUANTITY, TableIdentifiers.NAV_PER_SHARE];

export const NET_RETURNS_TABLE_ITEMS = [TableIdentifiers.DIVIDENDS, TableIdentifiers.APPRECIATION, TableIdentifiers.ADVISORY_FEES];
